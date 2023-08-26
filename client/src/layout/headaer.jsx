import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../style/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../context/auth";
import { toast } from "react-hot-toast";
const Header = () => {
  const { user, setUser } = useContext(context);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/adminuser");
      setUser(response.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  const logout = async () => {
    try {
      const logoutuser = await axios.get("/admin/logout");
      if (logoutuser) {
        toast.success("Logout successfull...!", {
          className: "success-toast",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="headaer">
        <div className="left">
          <FontAwesomeIcon icon={faTableList} />
          <h2>Task Manager</h2>
        </div>
        <div className="right">
          {status ? (
            <div className="minifrom">
              <div className="userinfo">
                <img
                  src={user.profile}
                  alt="images"
                  style={{ width: "50px" }}
                />
                <p>{user.name}</p>
              </div>
              <div className="userlink">
                <p>
                  <NavLink onClick={() => setStatus(false)} to="/profile">
                    <FontAwesomeIcon icon={faUser} /> Profile
                  </NavLink>
                </p>
                <p>
                  <button id="logoutbtn" onClick={logout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Logout
                  </button>
                </p>
              </div>
            </div>
          ) : null}
          <button id="headerbtn" onClick={() => setStatus(!status)}>
            <img src={user.profile} alt="imag" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
