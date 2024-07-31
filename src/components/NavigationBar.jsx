import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdFitnessCenter,
  MdFastfood,
  MdHome,
  MdOutlineSettingsSuggest ,
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
                  <MdOutlineSettingsSuggest  className="icon" />
                )}
                {isLoading ? (
                  <Skeleton variant="text" width={80} />
                ) : (
                  <p>الأدوات</p>
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