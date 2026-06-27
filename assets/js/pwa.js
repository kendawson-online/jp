/*
 * pwa.js
 *
 * Handles Progressive Web App installation.
 * This module exposes a small API:
 *
 *   PWA.canInstall()
 *   PWA.isInstalled()
 *   PWA.install()
 *   registerServiceWorker()
 *
 * It also dispatches:
 *
 *   document.dispatchEvent(
 *       new CustomEvent("pwa-state-changed")
 *   );
 */

const PWA_EVENT = 'pwa-state-changed';

let deferredPrompt = null;
let swRegistrationPromise = null;

window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    deferredPrompt = event;
    console.log("deferredPrompt =", deferredPrompt);
    console.log(
        "Installed:",
        isInstalled(),
        "Can install:",
        canInstall()
    );
    document.dispatchEvent(new CustomEvent(PWA_EVENT));
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    console.log(
        "Installed:",
        isInstalled(),
        "Can install:",
        canInstall()
    );
    document.dispatchEvent(new CustomEvent(PWA_EVENT));
});

function canInstall() {
    return deferredPrompt !== null;
}

function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches;
}

async function install() {
    if (!deferredPrompt) {
        return false;
    }
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.dispatchEvent(new CustomEvent(PWA_EVENT));
    return result.outcome === "accepted";
}

export function registerServiceWorker() {
    if ('serviceWorker' in navigator === false) {
        return Promise.resolve(null);
    }

    if (swRegistrationPromise) {
        return swRegistrationPromise;
    }
    swRegistrationPromise =
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ SW registered');
                return registration;
            })
            .catch(error => {
                console.error('❌ SW registration failed', error);

                // Allow retry if registration failed
                swRegistrationPromise = null;

                throw error;
            });
    return swRegistrationPromise;
}

export const PWA = {
    canInstall,
    isInstalled,
    install
};

export { PWA_EVENT };