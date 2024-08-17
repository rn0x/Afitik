import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import App from "./App.jsx";
import {
  enableBackgroundMode,
  isBackgroundModeActive,
  onBackgroundModeEvent,
  disableBatteryOptimizations,
  overrideBackButton,
  isScreenOff,
  wakeUp,
  setNotificationDefaults,
  disableWebViewOptimizations
} from './utils/backgroundMode.js';
import NavigationBarAndStatusBar from './components/NavigationBarAndStatusBar.jsx';
import { ThemeProvider } from './contexts/ThemeProvider.jsx';

/**
 * دالة لعرض React DOM بعد تحميل Cordova.
 */
async function handleCordovaReady() {
  console.log("Cordova is ready. Rendering React DOM...");

  if (window.cordova.platformId === 'android') {
    // backgroundMode
    setNotificationDefaults({
      title: "AFITIK",
      text: "Running 🛠️✨",
      icon: 'ic_stat_onesignal_default',
      silent: false
    });
    enableBackgroundMode();
    disableBatteryOptimizations();

    onBackgroundModeEvent('activate', () => {
      console.log('Background mode enabled:', isBackgroundModeActive());
      disableWebViewOptimizations();
    });

    isScreenOff((isOff) => {
      if (isOff) {
        console.log('Screen is off, waking up...');
        wakeUp();
      }
    });

    if (window.MobileAccessibility) {
      window.MobileAccessibility.usePreferredTextZoom(false);
    }

    if (window.cordova.plugins.autoStart) {
      window.cordova.plugins.autoStart.enable();
      window.cordova.plugins.autoStart.enableService("org.i8xnet.afitik");
    }
  }

  // Render the React DOM with the Cordova-specific setup
  renderReactDom();
}

/**
 * دالة لعرض React DOM.
 */
function renderReactDom() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <>
          <NavigationBarAndStatusBar />
          <App />
        </>
      </ThemeProvider>
    </React.StrictMode>
  );
}

/**
 * دالة لإضافة شفرة إعلانات Google AdSense إلى الصفحة.
 */
function injectAds() {
  // تحقق مما إذا كان في بيئة متصفح
  if (!window.cordova) {
    // قم بتحميل الشيفرة الخاصة بالإعلانات
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7565296297970041";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };
  }
}

// التحقق مما إذا كانت Cordova متاحة
if (window.cordova) {
  document.addEventListener('deviceready', handleCordovaReady, false);
} else {
  console.log("Cordova is not available. Rendering React DOM...");
  renderReactDom(); // Render without Cordova-specific setup
  injectAds();
}