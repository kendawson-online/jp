/*
 * pwa.js
 *
 * Handles Progressive Web App installation.
 * This module exposes a small API:
 *
 *   PWA.canInstall()
 *   PWA.isInstalled()
 *   PWA.install()
 *
 * It also dispatches:
 *
 *   document.dispatchEvent(
 *       new CustomEvent("pwa-state-changed")
 *   );
 */

const PWA_EVENT = "pwa-state-changed";
const PWA = (() => {

    let deferredPrompt = null;

    // ----------------------------------------------------
    // Detect install prompt availability
    // ----------------------------------------------------

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;
        document.dispatchEvent(
           new CustomEvent(PWA_EVENT)
        );
    });

    // ----------------------------------------------------
    // Detect successful installation
    // ----------------------------------------------------

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        document.dispatchEvent(
            new CustomEvent(PWA_EVENT)
        );
    });

    // ----------------------------------------------------
    // Public API
    // ----------------------------------------------------

    function canInstall() {
        return deferredPrompt !== null;
    }

    function isInstalled() {
        return window.matchMedia("(display-mode: standalone)").matches;
    }

    async function install() {

        if (!deferredPrompt) {
            return false;
        }

        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        deferredPrompt = null;

        document.dispatchEvent(
            new CustomEvent(PWA_EVENT)
        );

        return result.outcome === "accepted";
    }

    return {
        canInstall,
        isInstalled,
        install
    };

    // debugging 
    // console.log("beforeinstallprompt fired");
    // console.log("appinstalled fired");
    // console.log("Standalone:", PWA.isInstalled());
    // console.log("Install available:", PWA.canInstall());

})();