import React, { useEffect } from "react";
import { useTheme } from '../contexts/ThemeProvider.jsx';

const NavigationBarUpdater = () => {
    const { theme } = useTheme();

    useEffect(() => {
        if (window.cordova && window.NavigationBar) {
            const color = theme === 'light' ? "#ffffff" : "#1e1e1e";
            const iconIslight = theme === "light" ? true : false;
            window.NavigationBar.backgroundColorByHexString(color, iconIslight);
        }
    }, [theme]);

    return null;
};

export default NavigationBarUpdater;
