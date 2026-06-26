// -------------------------------------------------------
// jp.js - JavaScript for The Jesus Prayer app
// -------------------------------------------------------

const appVersion = '0.0.3-beta';
const lastUpdated = 'Jun. 26, 2026';

let isSpinning = false;
let currentDuration = parseInt(localStorage.getItem('rotationSpeed') || '30');
let displayArea = null;

const DEFAULT_SETTINGS = {
    theme: 'dark',
    glowDark: 'rgba(139, 0, 0, 0.451)',
    glowLight: '#000000',
    noRotation: true,
    noShadow: true,
    rotationSpeed: 30
};

let settings = { ...DEFAULT_SETTINGS };

function loadSettings() {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
        settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
}

function saveSettings() {
    localStorage.setItem('appSettings', JSON.stringify(settings));
}

function updateSetting(key, value) {
    settings[key] = value;
    saveSettings();
    if (key === 'theme') {
        applySettings();
    }
    if (['glowDark', 'glowLight', 'noShadow'].includes(key)) {
        applyGlowColor();
    }
    if (key === 'rotationSpeed') {
        currentDuration = value;
    }
}

// this function will be depecated in future versions 
function migrateOldSettings() {
    const oldKeys = ['theme', 'glowDark', 'glowLight', 'noRotation', 'noShadow', 'rotationSpeed'];
    let hasOldKeys = false;
    oldKeys.forEach(key => {
        if (localStorage.getItem(key) !== null) {
            hasOldKeys = true;
        }
    });
    if (hasOldKeys) {
        console.log('🧹 Migrating old settings — clearing localStorage');
        localStorage.clear();
        // Optional: small delay then reload so user sees the change
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ SW registered'))
            .catch(err => console.log('❌ SW registration failed', err));
    }
}

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

function applySettings() {
    if (settings.theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
    applyGlowColor();
}

function applyGlowColor() {
    const isLight = document.documentElement.classList.contains('light');
    let color = isLight ? settings.glowLight : settings.glowDark;
    if (settings.noShadow) color = 'transparent';
    document.documentElement.style.setProperty('--glow-color', color);
}

function showImage(imageUrl, title = "") {
    if (!displayArea) return;
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
    if (settings.noRotation) return;
    setTimeout(() => {
        const spinner = document.getElementById('spinner');
        if (!spinner || isSpinning) return;
        spinnerClickHandler();
    }, 3000);
}

function initializeDefaults() {
    loadSettings();
    currentDuration = settings.rotationSpeed;
}

function initMainPage() {
    migrateOldSettings();
    initializeDefaults();
    displayArea = document.getElementById('displayArea');
    applySettings();
    const gearIcon = document.getElementById('gearIcon');
    if (gearIcon) gearIcon.addEventListener('click', () => window.location.href = 'settings.html');
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
    let appVersionElement = document.getElementById('appVersion');
    let appLastUpdatedElement = document.getElementById('lastUpdated');
    if (appVersionElement && appLastUpdatedElement) {
        appVersionElement.textContent = appVersion;
        appLastUpdatedElement.textContent = lastUpdated;
    }
    registerServiceWorker();
}

function initSettingsPage() {
    migrateOldSettings();
    initializeDefaults();
    displayArea = null;
    applySettings();

    const themeControls = document.getElementById('themeControls');
    if (themeControls) {
        updateIcons(settings.theme === 'light');
        themeControls.addEventListener('click', () => {
            const nowLight = settings.theme === 'dark';
            updateSetting('theme', nowLight ? 'light' : 'dark');
            updateIcons(nowLight);
        });
    }    

    const closeBtn = document.getElementById('closeSettings');
    if (closeBtn) closeBtn.addEventListener('click', () => window.location.href = 'index.html');

    // Speed slider
    const speedSlider = document.getElementById('speedSliderSettings');
    const speedValueEl = document.getElementById('speedValueSettings');
    if (speedSlider) {
        speedSlider.value = settings.rotationSpeed;
        if (speedValueEl) speedValueEl.textContent = settings.rotationSpeed;
        speedSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            updateSetting('rotationSpeed', val);
            updateSpeed(val);
        });
    }

    // Glow colors
    const glowDark = document.getElementById('glowDark');
    const glowLight = document.getElementById('glowLight');
    if (glowDark) {
        glowDark.value = settings.glowDark;
        glowDark.addEventListener('input', (e) => {
            updateSetting('glowDark', e.target.value);
        });
    }
    if (glowLight) {
        glowLight.value = settings.glowLight;
        glowLight.addEventListener('input', (e) => {
            updateSetting('glowLight', e.target.value);
        });
    }

    // Checkboxes
    const noRotation = document.getElementById('noRotation');
    const noShadow = document.getElementById('noShadow');
    if (noRotation) {
        noRotation.checked = settings.noRotation;
        noRotation.addEventListener('change', (e) => updateSetting('noRotation', e.target.checked));
    }
    if (noShadow) {
        noShadow.checked = settings.noShadow;
        noShadow.addEventListener('change', (e) => updateSetting('noShadow', e.target.checked));
    }
    registerServiceWorker();
}