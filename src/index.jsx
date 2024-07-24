import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import App from "./App.jsx";


function renderReactDom() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    console.log("Cordova is ready. Rendering React DOM...");

    if (window.cordova.platformId === 'android') {
      if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
      }
    }

    renderReactDom();

  }, false);
} else {
  console.log("Cordova is not available. Rendering React DOM...");
  renderReactDom();
}
