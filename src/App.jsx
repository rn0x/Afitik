import React from "react";
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import NavigationBar from "./components/NavigationBar.jsx";
import MainRoutes from "./Routes/MainRoutes.jsx";

export default function App() {
  return (
    <Router>
      <HelmetProvider>
        <div className="App">
          <div className="Main">
            <MainRoutes />
          </div>
          <NavigationBar />
        </div>
      </HelmetProvider>
    </Router>
  );
}
