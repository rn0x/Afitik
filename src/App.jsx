import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FaSun, FaMoon } from 'react-icons/fa';
import NavigationBar from './components/NavigationBar.jsx';
import MainRoutes from './Routes/MainRoutes.jsx';

/**
 * تطبيق الواجهة الرئيسي للموقع.
 * 
 * @returns {JSX.Element} - واجهة المستخدم للتطبيق.
 */
export default function App() {
  const [theme, setTheme] = useState(() => {
    // استرجاع الثيم من الـ localStorage أو استخدام "dark" كقيمة افتراضية
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // تحديد لون الأيقونة بناءً على الثيم
  const iconColor = theme === 'dark' ? '#FFD700' : '#3a6b7c';

  return (
    <Router>
      <HelmetProvider>
        <div id="App">
          <MainRoutes />
          <button
            id='BtTheme'
            onClick={toggleTheme}
            style={{
              position: 'fixed', 
              bottom: 100, 
              left: 20, 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '12px'
            }}
          >
            {theme === 'dark' ? <FaSun color={iconColor} /> : <FaMoon color={iconColor} />}
          </button>
        </div>
        <NavigationBar />
      </HelmetProvider>
    </Router>
  );
}