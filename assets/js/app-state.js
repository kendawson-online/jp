// app-state.js
// Settings defaults and persistence

export const appVersion = '0.1.8-beta';
export const lastUpdated = 'June 29, 2026';

export const DEFAULT_SETTINGS = {
    theme: 'dark',
    glowDark: '#8B0000',
    glowLight: '#7d93a1',
    noRotation: true,
    noShadow: true,
    rotationSpeed: 30
};

const STORAGE_KEY = 'appSettings';

export let settings = { ...DEFAULT_SETTINGS };

export function loadSettings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } else {
        settings = { ...DEFAULT_SETTINGS };
    }
    return settings;
}

export function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function initializeDefaults() {
    loadSettings();
}

export function updateSetting(key, value) {
    settings[key] = value;
    saveSettings();
}