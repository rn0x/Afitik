import React from "react";
import { Route, Routes } from "react-router-dom";
import Exercises from "../pages/Exercises/Exercises.jsx";
import MuscleSelection from "../pages/Exercises/MuscleSelection.jsx";
import ExerciseList from "../pages/Exercises/ExerciseList.jsx";

export default function MusclesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Exercises />} />
      <Route path="/:gender" element={<MuscleSelection />} />
      <Route path="/:gender/:muscle" element={<ExerciseList />} />
    </Routes>
  );
}