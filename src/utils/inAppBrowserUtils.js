/**
 * Open a URL in the system's default browser.
 * @param {string} url - The URL to open.
 */
export const openSystem = (url) => {
    if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(url, "_system");
    } else {
        window.open(url, "_blank");
    }
};

/**
 * Open a URL in an in-app browser with standard options.
 * @param {string} url - The URL to open.
 */
export const openApp = (url) => {
    if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(url, "_blank", "location=yes");
    } else {
        window.open(url, "_blank");
    }
};

/**
 * Open a URL in an in-app browser with hidden mode.
 * @param {string} url - The URL to open.
 */
export const openHidden = (url) => {
    if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(url, "_blank", "hidden=yes");
    } else {
        window.open(url, "_blank");
    }
};

/**
 * Open a URL in an in-app browser with custom options.
 * @param {string} url - The URL to open.
 * @param {string} options - The options for the in-app browser.
 */
export const openWithOptions = (url, options) => {
    if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.open(url, "_blank", options);
    } else {
        window.open(url, "_blank");
    }
};
