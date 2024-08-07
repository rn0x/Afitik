import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import App from "./App.jsx";
import {
  scheduleLocalNotification,
  updateLocalNotification,
  cancelLocalNotification,
  isLocalNotificationPresent,
  registerLocalNotificationClickEvent,
  registerLocalNotificationActionEvent
} from "./utils/localNotifications.js";

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

/**
 * دالة لعرض React DOM بعد تحميل Cordova.
 */
function handleCordovaReady() {
  console.log("Cordova is ready. Rendering React DOM...");

  if (window.cordova.platformId === 'android') {

    // backgroundMode
    setNotificationDefaults({
      title: "",
      text: "Running 🛠️✨",
      icon: 'ic_stat_onesignal_default',
      silent: false
    });
    enableBackgroundMode();
    // overrideBackButton();
    disableBatteryOptimizations();
    // تنفيذ بعض العمليات عند تفعيل وضع الخلفية
    onBackgroundModeEvent('activate', () => {
      console.log('Background mode enabled:', isBackgroundModeActive());
      disableWebViewOptimizations();
      wakeUp();
    });

    // تأكد من أن التطبيق يستمر في العمل حتى عند إغلاق الشاشة
    isScreenOff((isOff) => {
      if (isOff) {
        console.log('Screen is off, waking up...');
        wakeUp();
      }
    });

    if (window.MobileAccessibility) {
      window.MobileAccessibility.usePreferredTextZoom(false);
    }

    if (window.NavigationBar) {
      window.NavigationBar.backgroundColorByHexString("#ffffff", true);
    }

    if (window.cordova.plugins.autoStart) {
      window.cordova.plugins.autoStart.enable();
      window.cordova.plugins.autoStart.enableService("org.i8xnet.afitik");
    }

    const notificationOptions = {
      id: 1331,
      title: 'عنوان الإشعار',
      text: 'محتوى الإشعار',
      smallIcon: 'res://mipmap-hdpi/ic_stat_onesignal_default.png',
      badge: 1,
    };

    scheduleLocalNotification(notificationOptions);

  }

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
      <App />
    </React.StrictMode>
  );
}

/**
 * دالة لإضافة شفرة إعلانات Google AdSense إلى الصفحة
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
  renderReactDom();
  injectAds();
}