import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FaSun, FaMoon } from 'react-icons/fa';
import NavigationBar from './components/NavigationBar.jsx';
import MainRoutes from './Routes/MainRoutes.jsx';
import { useTheme } from './contexts/ThemeProvider.jsx'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const iconColor = theme === 'dark' ? '#FFD700' : '#3a6b7c';

  return (
    <button id='BtTheme' onClick={toggleTheme}>
      {theme === 'dark' ? <FaSun color={iconColor} /> : <FaMoon color={iconColor} />}
    </button>
  );
}

/**
 * تطبيق الواجهة الرئيسي للموقع.
 * 
 * @returns {JSX.Element} - واجهة المستخدم للتطبيق.
 */
export default function App() {
  return (
    <Router>
      <HelmetProvider>
        <div id="App">
          <MainRoutes />
          <ThemeToggleButton />
        </div>
        <NavigationBar />
      </HelmetProvider>
    </Router>
  );
}