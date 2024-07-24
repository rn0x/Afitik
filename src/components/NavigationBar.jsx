import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdFitnessCenter,
  MdFastfood,
  MdHome,
  MdOutlineQueryStats,
  MdForum,
} from "react-icons/md";
import { Skeleton } from "@mui/material";
import "../assets/styles/NavigationBar.css";
import NoSelectComponent from "./NoSelectComponent.jsx";

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
            <NoSelectComponent>
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
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <Link
                to="/Workouts"
                id="nvBarWorkouts"
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
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
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
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <Link
                to="/Progress"
                id="nvBarProgress"
                title="التقدم الشخصي"
                aria-label="التقدم الشخصي"
                onMouseDown={(e) => e.preventDefault()}
                draggable="false"
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <MdOutlineQueryStats className="icon" />
                )}
                {isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  <p>التقدم الشخصي</p>
                )}
              </Link>
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <Link
                to="/Community"
                id="nvBarCommunity"
                title="المجتمع"
                aria-label="المجتمع"
                onMouseDown={(e) => e.preventDefault()}
                draggable="false"
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <MdForum className="icon" />
                )}
                {isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  <p>المجتمع</p>
                )}
              </Link>
            </NoSelectComponent>
          </li>
        </ul>
      </nav>
    </div>
  );
}