import React from "react";
import { Route, Routes } from "react-router-dom";
import CalorieCalculator from "../pages/Tools/CalorieCalculator.jsx";
import StepCounter from "../pages/Tools/StepCounter.jsx";


export default function ToolsRoutes() {
    return (
        <Routes>
            <Route path="calorie-calculator" element={<CalorieCalculator />} />
            <Route path="step-counter" element={<StepCounter />} />
        </Routes>
    );
}