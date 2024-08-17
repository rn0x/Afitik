import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeProvider.jsx';

/**
 * مكون للتحكم في لون شريط التنقل وشريط الحالة
 * @param {string} navigationBarColor - اللون الذي تريد تطبيقه على شريط التنقل (NavigationBar).
 * @param {boolean} navigationBarIconIsLight - إذا كانت الأيقونات في شريط التنقل يجب أن تكون فاتحة (true) أو داكنة (false).
 * @param {string} statusBarColor - اللون الذي تريد تطبيقه على شريط الحالة (StatusBar).
 * @param {boolean} statusBarIconIsLight - إذا كانت الأيقونات في شريط الحالة يجب أن تكون فاتحة (true) أو داكنة (false).
 * @param {boolean} overrideTheme - إذا كنت تريد تجاوز اللون المستند على الثيم.
 */
const NavigationBarAndStatusBar = ({
  navigationBarColor,
  navigationBarIconIsLight = true,
  statusBarColor,
  statusBarIconIsLight = true,
  overrideTheme = false,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const appliedNavigationBarColor = overrideTheme
      ? navigationBarColor
      : theme === 'dark'
        ? '#1e1e1e'
        : '#ffffff';

    const appliedStatusBarColor = overrideTheme
      ? statusBarColor
      : theme === 'dark'
        ? '#1e1e1e'
        : '#ffffff';

    const appliedNavigationBarIconIsLight = overrideTheme
      ? navigationBarIconIsLight
      : theme === 'dark';

    const appliedStatusBarIconIsLight = overrideTheme
      ? statusBarIconIsLight
      : theme === 'dark';

    // تحديث لون شريط التنقل
    if (window.NavigationBar) {
      window.NavigationBar.backgroundColorByHexString(appliedNavigationBarColor, appliedNavigationBarIconIsLight);
    }

    // تحديث لون شريط الحالة
    if (window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(appliedStatusBarColor);
      if (appliedStatusBarIconIsLight) {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  }, [
    theme,
    navigationBarColor,
    navigationBarIconIsLight,
    statusBarColor,
    statusBarIconIsLight,
    overrideTheme,
  ]);

  return null;
};

export default NavigationBarAndStatusBar;