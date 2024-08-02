import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import App from "./App.jsx";


/**
 * دالة لعرض React DOM بعد تحميل Cordova.
 */
function handleCordovaReady() {
  console.log("Cordova is ready. Rendering React DOM...");

  if (window.cordova.platformId === 'android') {
    if (window.MobileAccessibility) {
      window.MobileAccessibility.usePreferredTextZoom(false);
    }
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

// التحقق مما إذا كانت Cordova متاحة
if (window.cordova) {
  document.addEventListener('deviceready', handleCordovaReady, false);
} else {
  console.log("Cordova is not available. Rendering React DOM...");
  renderReactDom();
}
