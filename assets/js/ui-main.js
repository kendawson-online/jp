// ui-main.js

import { initializeDefaults, settings, appVersion, lastUpdated } from './app-state.js';
import { applySettings, scrollToTop, showHelpMsg } from './utils.js';
import { registerServiceWorker, PWA, PWA_EVENT } from "./pwa.js";

let isSpinning = false;
let currentDuration = 30;
let displayArea = null;

let section = null;
let installButton = null;


function showImage(imageUrl, title = "") {
    isSpinning = false;
    if (!displayArea) {
        console.warn('displayArea not found - showImage failed');
        return false;
    }
    displayArea.innerHTML = `
        <div class="static-image" title="${title}">
            <img src="${imageUrl}" alt="${title}">
        </div>
    `;
    scrollToTop();
    return true;
}

function resetToSpinner() {
    if (displayArea) {
        displayArea.innerHTML = `<div class="spinner paused" id="spinner" title="Lord Jesus Christ Son of God have mercy on me a sinner"></div>`;
        const newSpinner = document.getElementById('spinner');
        if (newSpinner) {
            newSpinner.addEventListener('click', spinnerClickHandler);
            applyRotationPreference();
            scrollToTop();
        }
    }
}

function spinnerClickHandler() {
    isSpinning = !isSpinning;
    const currentSpinner = document.getElementById('spinner');
    if (!currentSpinner) return;
    if (isSpinning) {
        currentSpinner.classList.remove('paused');
        currentSpinner.style.animation = `spin ${currentDuration}s linear infinite`;
    } else {
        currentSpinner.classList.add('paused');
        currentSpinner.style.animation = 'none';
    }
}

function applyRotationPreference() {
    if (settings.noRotation) return;
    setTimeout(() => {
        const spinner = document.getElementById('spinner');
        if (!spinner || isSpinning) return;
        spinnerClickHandler();
    }, 3000);
}

function updatePWAInstallUI() {

    const icon = document.getElementById("install-icon");
    const label = document.getElementById("install-label");

    if (PWA.isInstalled()) {

        section.classList.remove("hidden");

        installButton.disabled = true;
        installButton.title = "You already have this app installed.";

        icon.src = "assets/img/app-icons/checkmark.svg";
        label.textContent = "Installed";

        return;
    }

    if (PWA.canInstall()) {

        section.classList.remove("hidden");

        installButton.disabled = false;
        installButton.title = "";

        icon.src = "assets/img/app-icons/download.svg";
        label.textContent = "Install App";

        return;
    }

    section.classList.add("hidden");
}

function initMainPage() {

    initializeDefaults();
    currentDuration = settings.rotationSpeed;
    displayArea = document.getElementById('displayArea');
    applySettings();

    const gearButton = document.getElementById('gearButton');
    if (gearButton) gearButton.addEventListener('click', () => window.location.href = 'settings.html');

    document.getElementById('btnJesus')?.addEventListener('click', () => showImage('assets/img/jesus.jpg', 'Christ Pantocrator'));
    document.getElementById('btnMary')?.addEventListener('click', () => showImage('assets/img/mary.jpg', 'Theotokos'));
    document.getElementById('btnLord')?.addEventListener('click', () => showImage('assets/img/lords-prayer.jpg', "The Lord's Prayer"));
    document.getElementById('btnHail')?.addEventListener('click', () => showImage('assets/img/hail-mary.jpg', 'Hail Mary'));
    document.getElementById('btnCross')?.addEventListener('click', () => showImage('assets/img/cross.png', 'Orthodox Cross'));
    document.getElementById('btnJesusPrayer')?.addEventListener('click', resetToSpinner);

    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.addEventListener('click', spinnerClickHandler);
        applyRotationPreference();
    }

    const appVersionElement = document.getElementById('appVersion');
    const appLastUpdatedElement = document.getElementById('lastUpdated');
    if (appVersionElement && appLastUpdatedElement) {
        appVersionElement.textContent = appVersion;
        appLastUpdatedElement.textContent = lastUpdated;
    }

    registerServiceWorker();
    showHelpMsg();
    
    section = document.getElementById('pwa-install');
    installButton = document.getElementById('install-app-btn');

    updatePWAInstallUI();
    document.addEventListener(PWA_EVENT, updatePWAInstallUI);

    installButton?.addEventListener('click', async () => {
        await PWA.install();
    });
}

export {
    showImage,
    resetToSpinner,
    spinnerClickHandler,
    applyRotationPreference,
    initMainPage
};