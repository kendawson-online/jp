// settings.js

import { initSettingsPage } from './ui-settings.js';

function bootSettings() {
    initSettingsPage();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSettings);
} else {
    bootSettings();
}