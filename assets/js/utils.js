// utils.js
// Shared helpers used by multiple pages

import { appVersion, lastUpdated, settings } from './app-state.js';

export function updateSpeed(duration) {
    const speedValue = document.getElementById('speedValue');
    const speedValueSettings = document.getElementById('speedValueSettings');

    if (speedValue) {
        speedValue.textContent = duration;
    }

    if (speedValueSettings) {
        speedValueSettings.textContent = duration;
    }
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export function applyGlowColor() {
    const isLight = document.documentElement.classList.contains('light');
    let color = isLight ? settings.glowLight : settings.glowDark;
    if (settings.noShadow) color = 'transparent';
    document.documentElement.style.setProperty('--glow-color', color);
}

export function applySettings() {
    if (settings.theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
    applyGlowColor();
}

export function showHelpMsg() {
    const helpMsg = document.getElementById('helpMsg');
    if (helpMsg) {
        const firstRunFlag = localStorage.getItem('firstRunFlag');
        if (firstRunFlag) {
            helpMsg.style.display = 'none';
        } else {
            console.log(`☦️ Jesus Prayer version ${appVersion}`);
            console.log(`Last updated: ${lastUpdated}`);
            localStorage.setItem('firstRunFlag', true);
        }
    }
}

export function setTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
}

export function getTheme() {
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export function byId(id) {
    return document.getElementById(id);
}