// ui-settings.js

import { initializeDefaults, settings, updateSetting } from './app-state.js';
import { applySettings, applyGlowColor, updateSpeed } from './utils.js';

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

function initSettingsPage() {

    initializeDefaults();
    applySettings();

    const themeControls = document.getElementById('themeControls');
    if (themeControls) {
        updateIcons(settings.theme === 'light');
        themeControls.addEventListener('click', () => {
            const nowLight = settings.theme === 'dark';
            updateSetting('theme', nowLight ? 'light' : 'dark');
            applySettings();
            updateIcons(nowLight);
        });
    }

    const closeBtn = document.getElementById('closeSettings');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => window.location.href = 'index.html');
    }

    const speedSlider = document.getElementById('speedSliderSettings');
    const speedValueEl = document.getElementById('speedValueSettings');
    if (speedSlider) {
        speedSlider.value = settings.rotationSpeed;
        if (speedValueEl) {
            speedValueEl.textContent = settings.rotationSpeed;
        }
        speedSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            updateSetting('rotationSpeed', val);
            updateSpeed(val);
        });
    }

    const glowDark = document.getElementById('glowDark');
    const glowLight = document.getElementById('glowLight');
    if (glowDark) {
        glowDark.value = settings.glowDark;
        glowDark.addEventListener('input', (e) => {
            updateSetting('glowDark', e.target.value);
            applyGlowColor();
        });
    }
    if (glowLight) {
        glowLight.value = settings.glowLight;
        glowLight.addEventListener('input', (e) => {
            updateSetting('glowLight', e.target.value);
            applyGlowColor();
        });
    }

    const noRotation = document.getElementById('noRotation');
    const noShadow = document.getElementById('noShadow');
    if (noRotation) {
        noRotation.checked = settings.noRotation;
        noRotation.addEventListener('change', (e) => updateSetting('noRotation', e.target.checked));
    }
    if (noShadow) {
        noShadow.checked = settings.noShadow;
        noShadow.addEventListener('change', (e) => {
            updateSetting('noShadow', e.target.checked);
            applyGlowColor();
        });
    }
}

export { updateIcons, initSettingsPage };