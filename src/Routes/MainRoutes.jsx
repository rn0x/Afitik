import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Nutrition from "../pages/Nutrition.jsx";
import Tools from "../pages/Tools.jsx";
import Community from "../pages/Community.jsx";
import MusclesRoutes from "./MusclesRoutes.jsx";
import ExercisesRoutes from "./ExercisesRoutes.jsx";


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/index.html" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/Exercises/*" element={<ExercisesRoutes />} />
      <Route path="/Nutrition" element={<Nutrition />} />
      <Route path="/Tools" element={<Tools />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/muscles/*" element={<MusclesRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
