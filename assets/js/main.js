// main.js

import { initMainPage } from './ui-main.js';

function bootMain() {
    initMainPage();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootMain);
} else {
    bootMain();
}