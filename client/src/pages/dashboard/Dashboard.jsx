import React from "react";
import "../../style/nav.css";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faPenToSquare,
  faGamepad,
  faForwardFast,
  faCircleCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../layout/headaer";
const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="navlink">
        <div className="navlinkbar">
          <nav>
            <NavLink to="/main">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              Dashboard
            </NavLink>
            <NavLink to="/addgame">
              <FontAwesomeIcon icon={faPenToSquare} />
              Add Games
            </NavLink>
            <NavLink to="/allgames">
              <FontAwesomeIcon icon={faGamepad} />
              All Games
            </NavLink>
            <NavLink to="/upcoming">
              <FontAwesomeIcon icon={faForwardFast} />
              Upcoming Games
            </NavLink>
            <NavLink to="/complite">
              <FontAwesomeIcon icon={faCircleCheck} />
              Complete Games
            </NavLink>
            <NavLink to="/notcomplite">
              <FontAwesomeIcon icon={faSquareXmark} />
              Not Complete
            </NavLink>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
