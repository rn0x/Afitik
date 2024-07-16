import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdFitnessCenter,
  MdFastfood,
  MdHome,
  MdOutlineQueryStats,
  MdForum,
} from "react-icons/md";
import "../assets/styles/NavigationBar.css";
import NoSelectComponent from "./NoSelectComponent.jsx";

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <nav>
        <ul>
          <li>
            <NoSelectComponent>
              <NavLink
                to="/"
                title="الصفحة الرئيسية"
                aria-label="الصفحة الرئيسية"
              >
                <MdHome className="icon" />
                <p>الصفحة الرئيسية</p>
              </NavLink>
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <NavLink to="/Workouts" title="التمارين" aria-label="التمارين">
                <MdFitnessCenter className="icon" />
                <p>التمارين</p>
              </NavLink>
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <NavLink to="/Nutrition" title="التغذية" aria-label="التغذية">
                <MdFastfood className="icon" />
                <p>التغذية</p>
              </NavLink>
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <NavLink
                to="/Progress"
                title="التقدم الشخصي"
                aria-label="التقدم الشخصي"
              >
                <MdOutlineQueryStats className="icon" />
                <p>التقدم الشخصي</p>
              </NavLink>
            </NoSelectComponent>
          </li>
          <li>
            <NoSelectComponent>
              <NavLink to="/Community" title="المجتمع" aria-label="المجتمع">
                <MdForum className="icon" />
                <p>المجتمع</p>
              </NavLink>
            </NoSelectComponent>
          </li>
        </ul>
      </nav>
    </div>
  );
}