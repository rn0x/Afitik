/**
 * @file clipboardUtils.js
 * @description Utility functions for interacting with the clipboard. Supports both Cordova and non-Cordova environments.
 */

/**
 * Copies the given text to the clipboard.
 * @param {string} text - The text to be copied to the clipboard.
 * @param {Function} [onSuccess] - Optional callback function that is called when the copy operation is successful.
 * @param {Function} [onError] - Optional callback function that is called when the copy operation fails.
 */
function copyToClipboard(text, onSuccess, onError) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.clipboard) {
        // Cordova environment
        window.cordova.plugins.clipboard.copy(text, onSuccess, onError);
    } else if (navigator.clipboard) {
        // Modern browser environment
        navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to copy text: ', err);
            if (onError) onError(err);
        }
        document.body.removeChild(textarea);
    }
}

/**
 * Pastes text from the clipboard.
 * @param {Function} onSuccess - Callback function that is called with the text from the clipboard.
 * @param {Function} [onError] - Optional callback function that is called when the paste operation fails.
 */
function pasteFromClipboard(onSuccess, onError) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.clipboard) {
        // Cordova environment
        window.cordova.plugins.clipboard.paste(onSuccess, onError);
    } else if (navigator.clipboard) {
        // Modern browser environment
        navigator.clipboard.readText().then(onSuccess).catch(onError);
    } else {
        console.error("Clipboard paste is not supported in this environment.");
        if (onError) onError(new Error("Clipboard paste is not supported."));
    }
}

/**
 * Clears the content of the clipboard.
 * @param {Function} [onSuccess] - Optional callback function that is called when the clear operation is successful.
 * @param {Function} [onError] - Optional callback function that is called when the clear operation fails.
 */
function clearClipboard(onSuccess, onError) {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.clipboard) {
        // Cordova environment
        window.cordova.plugins.clipboard.copy('', onSuccess, onError);
    } else if (navigator.clipboard) {
        // Modern browser environment
        navigator.clipboard.writeText('').then(onSuccess).catch(onError);
    } else {
        console.error("Clipboard clear is not supported in this environment.");
        if (onError) onError(new Error("Clipboard clear is not supported."));
    }
}

// Export functions if using ES6 modules
export { copyToClipboard, pasteFromClipboard, clearClipboard };
