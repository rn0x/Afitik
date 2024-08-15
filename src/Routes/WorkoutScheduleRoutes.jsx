import React from "react";
import { Route, Routes } from "react-router-dom";
import WorkoutSchedule from "../pages/WorkoutSchedule/WorkoutSchedule.jsx";
import WarmUpExercises from "../pages/WorkoutSchedule/WarmUpExercises.jsx";
import FirstDayGym from "../pages/WorkoutSchedule/FirstDayGym.jsx";
import ThreeDaysWorkout from "../pages/WorkoutSchedule/ThreeDaysWorkout.jsx";
import FourDaysWorkout from "../pages/WorkoutSchedule/FourDaysWorkout.jsx";
import FiveDaysWorkout from "../pages/WorkoutSchedule/FiveDaysWorkout.jsx";
import SixDaysWorkout from "../pages/WorkoutSchedule/SixDaysWorkout.jsx";
import HomeWorkout from "../pages/WorkoutSchedule/HomeWorkout.jsx";


export default function MusclesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WorkoutSchedule />} />
      <Route path="/warm-up-exercises" element={<WarmUpExercises />} />
      <Route path="/first-day-gym" element={<FirstDayGym />} />
      <Route path="/3-days-weekly-workout" element={<ThreeDaysWorkout />} />
      <Route path="/4-days-weekly-workout" element={<FourDaysWorkout />} />
      <Route path="/5-days-weekly-workout" element={<FiveDaysWorkout />} />
      <Route path="/6-days-weekly-workout" element={<SixDaysWorkout />} />
      <Route path="/home-workout" element={<HomeWorkout />} />
    </Routes>
  );
}