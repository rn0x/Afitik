import React from "react";
import { Route, Routes } from "react-router-dom";
import Chest from "../pages/muscles/Chest.jsx";
import Back from "../pages/muscles/Back.jsx";
import Biceps from "../pages/muscles/Biceps.jsx";
import Forearms from "../pages/muscles/Forearms.jsx";
import Hamstrings from "../pages/muscles/Hamstrings.jsx";
import Quadriceps from "../pages/muscles/Quadriceps.jsx";
import Calves from "../pages/muscles/Calves.jsx";
import Shoulders from "../pages/muscles/Shoulders.jsx";
import Triceps from "../pages/muscles/Triceps.jsx";
import NotFound from "../pages/NotFound.jsx";

export default function MusclesRoutes() {
  return (
    <Routes>
      <Route path="Chest" element={<Chest />} />
      <Route path="Back" element={<Back />} />
      <Route path="Biceps" element={<Biceps />} />
      <Route path="Forearms" element={<Forearms />} />
      <Route path="Hamstrings" element={<Hamstrings />} />
      <Route path="Quadriceps" element={<Quadriceps />} />
      <Route path="Calves" element={<Calves />} />
      <Route path="Shoulders" element={<Shoulders />} />
      <Route path="Triceps" element={<Triceps />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
