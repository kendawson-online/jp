/*
 * pwa.js
 *
 * Handles Progressive Web App installation.
 */

const PWA_EVENT = 'pwa-state-changed';
const INSTALL_KEY = 'appInstalled';
const mediaQuery = window.matchMedia('(display-mode: standalone)');

let installed = false;
let deferredPrompt = null;
let swRegistrationPromise = null;

/* ------------------------------------------------------------------
 * Private helpers
 * ------------------------------------------------------------------ */

function refreshInstalledState() {

    let persisted = false;

    try {
        persisted = localStorage.getItem(INSTALL_KEY) === '1';
    } catch (err) {
        // ignore storage errors
    }

    const standalone = mediaQuery.matches;
    const iosStandalone = window.navigator.standalone === true;

    installed = standalone || iosStandalone || persisted;

    if (installed) {
        try {
            localStorage.setItem(INSTALL_KEY, '1');
        } catch (err) {
            // ignore storage errors
        }
    }

    return installed;
}

function notifyStateChanged() {
    refreshInstalledState();
    document.dispatchEvent(new CustomEvent(PWA_EVENT));
}

/* ------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------ */

function canInstall() {
    return deferredPrompt !== null;
}

function isInstalled() {
    return installed;
}

async function install() {

    if (!deferredPrompt) {
        return false;
    }

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    deferredPrompt = null;

    if (result.outcome === 'accepted') {
        try {
            localStorage.setItem(INSTALL_KEY, '1');
        } catch (err) {
            // ignore storage errors
        }
    }

    notifyStateChanged();

    return result.outcome === 'accepted';
}

/* ------------------------------------------------------------------
 * Initialization
 * ------------------------------------------------------------------ */

notifyStateChanged();

/* ------------------------------------------------------------------
 * Browser event listeners
 * ------------------------------------------------------------------ */

window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();

    deferredPrompt = event;

    notifyStateChanged();

});

window.addEventListener('appinstalled', () => {

    deferredPrompt = null;

    try {
        localStorage.setItem(INSTALL_KEY, '1');
    } catch (err) {
        // ignore storage errors
    }

    notifyStateChanged();

});

const mediaChanged = () => {
    notifyStateChanged();
};

if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', mediaChanged);
} else {
    mediaQuery.addListener(mediaChanged);
}

window.addEventListener('storage', (event) => {

    if (event.key !== INSTALL_KEY) {
        return;
    }

    notifyStateChanged();

});

/* ------------------------------------------------------------------
 * Service Worker
 * ------------------------------------------------------------------ */

export function registerServiceWorker() {

    if (!('serviceWorker' in navigator)) {
        return Promise.resolve(null);
    }

    if (swRegistrationPromise) {
        return swRegistrationPromise;
    }

    swRegistrationPromise =
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {

                console.log('✅ SW registered');

                navigator.serviceWorker.ready.then(() => {
                    console.log('✅ SW ready');
                });

                return registration;

            })
            .catch(error => {

                console.error('❌ SW registration failed', error);

                swRegistrationPromise = null;

                throw error;

            });

    return swRegistrationPromise;
}

/* ------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------ */

export const PWA = {
    canInstall,
    isInstalled,
    install
};

export { PWA_EVENT };