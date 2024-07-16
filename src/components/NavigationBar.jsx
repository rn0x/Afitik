import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MdFitnessCenter,
  MdFastfood,
  MdHome,
  MdOutlineQueryStats,
  MdForum,
} from "react-icons/md";
import "../assets/styles/NavigationBar.css";

export default function NavigationBar() {
  return (
    <div className="navigation-bar">
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <MdHome className="icon" />
              <p>الصفحة الرئيسية</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Workouts">
              <MdFitnessCenter className="icon" />
              <p>التمارين</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Nutrition">
              <MdFastfood className="icon" />
              <p>التغذية</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Progress">
              <MdOutlineQueryStats className="icon" />
              <p>التقدم الشخصي</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Community">
              <MdForum className="icon" />
              <p>المجتمع</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
