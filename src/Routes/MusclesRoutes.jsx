import React from "react";
import { Route, Routes } from "react-router-dom";
import MusclePage from "../pages/MusclePage.jsx";

export default function MusclesRoutes() {
  return (
    <Routes>
      <Route path=":muscleId" element={<MusclePage />} />
    </Routes>
  );
}