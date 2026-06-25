// -------------------------------------------------------
// jp.js - JavaScript for The Jesus Prayer app
// -------------------------------------------------------

const appVersion = '0.0.2-beta';
const lastUpdated = 'Jun. 25, 2026';

let isSpinning = false;
let currentDuration = parseInt(localStorage.getItem('rotationSpeed') || '40');
let displayArea = null;

function updateIcons(isLight) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const toggleIcon = document.getElementById('toggleIcon');
    if (!sunIcon || !moonIcon || !toggleIcon) return;
    if (isLight) {
        sunIcon.src = 'assets/img/app-icons/sun-fill.svg';
        moonIcon.src = 'assets/img/app-icons/moon.svg';
        toggleIcon.src = 'assets/img/app-icons/toggle-off.svg';
    } else {
        sunIcon.src = 'assets/img/app-icons/sun.svg';
        moonIcon.src = 'assets/img/app-icons/moon-fill.svg';
        toggleIcon.src = 'assets/img/app-icons/toggle-on.svg';
    }
}

function applyGlowColor() {
    const isLight = document.documentElement.classList.contains('light');
    const savedGlowDark = localStorage.getItem('glowDark') || '#8b0000';
    const savedGlowLight = localStorage.getItem('glowLight') || '#8b0000';
    const noShadow = localStorage.getItem('noShadow') === 'true';
    let color = isLight ? savedGlowLight : savedGlowDark;
    if (noShadow) color = 'transparent';
    document.documentElement.style.setProperty('--glow-color', color);
}

function applySettings() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
    applyGlowColor();
}

function showImage(imageUrl, title = "") {
    isSpinning = false;
    if (displayArea) {
        displayArea.innerHTML = `
            <div class="static-image" title="${title}">
                <img src="${imageUrl}" alt="${title}">
            </div>
        `;
        scrollToTop();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function resetToSpinner() {
    if (displayArea) {
        displayArea.innerHTML = `
            <div class="spinner paused" id="spinner"
                 title="Lord Jesus Christ Son of God have mercy on me a sinner"></div>
        `;
        const newSpinner = document.getElementById('spinner');
        if (newSpinner) {
            newSpinner.addEventListener('click', spinnerClickHandler);
            applyRotationPreference();
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

function updateSpeed(duration) {
    currentDuration = duration;
    ['speedValue', 'speedValueSettings'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = duration;
    });
}

function applyRotationPreference() {
    const disableAutoRotation =
        localStorage.getItem('noRotation') === 'true';
    if (disableAutoRotation) return;
    setTimeout(() => {
        const spinner = document.getElementById('spinner');
        if (!spinner) return;
        if (!isSpinning) {
            spinnerClickHandler();
        }
    }, 3000);
}

function initializeDefaults() {
    if (localStorage.getItem('noRotation') === null) {
        localStorage.setItem('noRotation', 'true');
    }
    if (localStorage.getItem('noShadow') === null) {
        localStorage.setItem('noShadow', 'true');
    }
    if (localStorage.getItem('rotationSpeed') === null) {
        localStorage.setItem('rotationSpeed', '40');
    }
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'dark');
    }
}

function initMainPage() {
    initializeDefaults();
    let displayArea = document.getElementById('displayArea');
    applySettings();
    const gearIcon = document.getElementById('gearIcon');
    if (gearIcon) gearIcon.addEventListener('click', () => window.location.href = 'settings.html');
    document.getElementById('btnJesus')?.addEventListener('click', () => showImage('/assets/img/jesus.jpg', 'Christ Pantocrator'));
    document.getElementById('btnMary')?.addEventListener('click', () => showImage('/assets/img/mary.jpg', 'Theotokos'));
    document.getElementById('btnLord')?.addEventListener('click', () => showImage('/assets/img/lords-prayer.jpg', "The Lord's Prayer"));
    document.getElementById('btnHail')?.addEventListener('click', () => showImage('/assets/img/hail-mary.jpg', 'Hail Mary'));
    document.getElementById('btnCross')?.addEventListener('click', () => showImage('/assets/img/cross.png', 'Orthodox Cross'));
    document.getElementById('btnJesusPrayer')?.addEventListener('click', resetToSpinner);
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.addEventListener('click', spinnerClickHandler);
        applyRotationPreference();
    }
    let appVersionElement = document.getElementById('appVersion');
    let appLastUpdatedElement = document.getElementById('lastUpdated');
    if (appVersionElement && appLastUpdatedElement) {
        appVersionElement.textContent = appVersion;
        appLastUpdatedElement.textContent = lastUpdated;
    }
}

function initSettingsPage() {
    initializeDefaults();
    displayArea = null;
    applySettings();
    const themeControls = document.getElementById('themeControls');
    if (themeControls) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        updateIcons(savedTheme === 'light');
        themeControls.addEventListener('click', () => {
            const nowLight = !document.documentElement.classList.contains('light');
            document.documentElement.classList.toggle('light');
            localStorage.setItem(
                'theme',
                nowLight ? 'light' : 'dark'
            );
            updateIcons(nowLight);
            applyGlowColor();
        });
    }    
    const closeBtn = document.getElementById('closeSettings');
    if (closeBtn) closeBtn.addEventListener('click', () => window.location.href = 'index.html');
    const speedSlider = document.getElementById('speedSliderSettings');
    const speedValueEl = document.getElementById('speedValueSettings');
    if (speedSlider) {
        speedSlider.value = currentDuration;
        if (speedValueEl) speedValueEl.textContent = currentDuration;
        speedSlider.addEventListener('input', (e) => {
            updateSpeed(parseInt(e.target.value));
            localStorage.setItem('rotationSpeed', e.target.value);
        });
    }
    const glowDark = document.getElementById('glowDark');
    const glowLight = document.getElementById('glowLight');
    if (glowDark) {
        glowDark.value = localStorage.getItem('glowDark') || '#8b0000';
        glowDark.addEventListener('input', (e) => {
            localStorage.setItem('glowDark', e.target.value);
            applyGlowColor();
        });
    }
    if (glowLight) {
        glowLight.value = localStorage.getItem('glowLight') || '#8b0000';
        glowLight.addEventListener('input', (e) => {
            localStorage.setItem('glowLight', e.target.value);
            applyGlowColor();
        });
    }
    const noRotation = document.getElementById('noRotation');
    const noShadow = document.getElementById('noShadow');
    if (noRotation) {
        const rotationSetting = localStorage.getItem('noRotation');
        noRotation.checked =
            rotationSetting === null
                ? true
                : rotationSetting === 'true';
        noRotation.addEventListener('change', (e) => localStorage.setItem('noRotation', e.target.checked));
    }
    if (noShadow) {
        const shadowSetting = localStorage.getItem('noShadow');
        noShadow.checked =
            shadowSetting === null
                ? true
                : shadowSetting === 'true';
        noShadow.addEventListener('change', (e) => {
            localStorage.setItem('noShadow', e.target.checked);
            applyGlowColor();
        });
    }
}
