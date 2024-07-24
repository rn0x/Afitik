import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Workouts from "../pages/Workouts.jsx";
import Nutrition from "../pages/Nutrition.jsx";
import Progress from "../pages/Progress.jsx";
import Community from "../pages/Community.jsx";
import MusclesRoutes from "./MusclesRoutes.jsx";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/index.html" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/Workouts" element={<Workouts />} />
      <Route path="/Nutrition" element={<Nutrition />} />
      <Route path="/Progress" element={<Progress />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/muscles/*" element={<MusclesRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
