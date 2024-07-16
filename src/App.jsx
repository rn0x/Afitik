import React from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NavigationBar from "./components/NavigationBar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Workouts from "./pages/Workouts.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import Progress from "./pages/Progress.jsx";
import Community from "./pages/Community.jsx";

export default function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Workouts" element={<Workouts />} />
          <Route path="/Nutrition" element={<Nutrition />} />
          <Route path="/Progress" element={<Progress />} />
          <Route path="/Community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}
