import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./utils/reportWebVitals.js";
import "./assets/styles/index.css";
import "./assets/styles/variables.css";
import App from "./App.jsx";

function onAppReady() {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

if (window.cordova) {
  document.addEventListener("deviceready", onAppReady, false); // تنفيذ عند جاهزية Cordova
} else {
  onAppReady(); // تنفيذ للتجريب في المتصفح
  reportWebVitals();
}
