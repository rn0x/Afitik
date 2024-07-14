import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.jsx';
import reportWebVitals from './utils/reportWebVitals.js';

function onAppReady() {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (window.cordova) {
  document.addEventListener('deviceready', onAppReady, false); // تنفيذ عند جاهزية Cordova
} else {
  onAppReady(); // تنفيذ للتجريب في المتصفح
  reportWebVitals();
}
