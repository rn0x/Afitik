import React, { useEffect } from 'react';

/**
 * A React component that sets the color of the status bar on Android devices.
 * The color is specified via the `color` prop, which should be a valid hex color string.
 *
 * @component
 * @example
 * // Usage example
 * return (
 *   <StatusBarColor color="#7AB2B2" />
 * );
 *
 * @param {string} color - The color to set for the status bar, specified as a hex string (e.g., "#7AB2B2").
 * @returns {null} This component does not render anything to the DOM.
 */
const StatusBarColor = ({ color }) => {
    useEffect(() => {
        // Check if Cordova and StatusBar are available
        if (window.cordova && window.StatusBar) {
            try {
                if (window.cordova.platformId === 'android') {
                    window.StatusBar.backgroundColorByHexString(color);
                }
            } catch (error) {
                console.error("Failed to set status bar color: ", error);
            }
        } else {
            console.warn("Cordova or StatusBar plugin is not available.");
        }
    }, [color]); // Re-run effect if color changes

    return null;
};

export default StatusBarColor;
