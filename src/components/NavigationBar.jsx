import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdFitnessCenter,
  MdFastfood,
  MdHome,
  MdOutlineSettingsSuggest,
} from "react-icons/md";
import { Skeleton } from "@mui/material";
import "../assets/styles/NavigationBar.css";

export default function NavigationBar() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="navigation-bar" unselectable="on">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              id="nvBarHome"
              title="الصفحة الرئيسية"
              aria-label="الصفحة الرئيسية"
              onMouseDown={(e) => e.preventDefault()}
              draggable="false"
            >
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <MdHome className="icon" />
              )}
              {isLoading ? (
                <Skeleton variant="text" width={80} />
              ) : (
                <p>الصفحة الرئيسية</p>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/Exercises"
              id="nvBarExercises"
              title="التمارين"
              aria-label="التمارين"
              onMouseDown={(e) => e.preventDefault()}
              draggable="false"
            >
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <MdFitnessCenter className="icon" />
              )}
              {isLoading ? (
                <Skeleton variant="text" width={80} />
              ) : (
                <p>التمارين</p>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/Nutrition"
              id="nvBarNutrition"
              title="التغذية"
              aria-label="التغذية"
              onMouseDown={(e) => e.preventDefault()}
              draggable="false"
            >
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <MdFastfood className="icon" />
              )}
              {isLoading ? (
                <Skeleton variant="text" width={80} />
              ) : (
                <p>التغذية</p>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/Tools"
              id="nvBarTools"
              title="الأدوات"
              aria-label="الأدوات"
              onMouseDown={(e) => e.preventDefault()}
              draggable="false"
            >
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <MdOutlineSettingsSuggest className="icon" />
              )}
              {isLoading ? (
                <Skeleton variant="text" width={80} />
              ) : (
                <p>الأدوات</p>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}