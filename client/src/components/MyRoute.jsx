import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Add from "../pages/add/Add";
import Register from "../pages/register/Register";
import Alldata from "../pages/all data/Alldata";
import Main from "../pages/dashboard/Main";
import Upcoming from "../pages/upcoming/Upcoming";
import Notcomplete from "../pages/not complete/Notcomplete";
import Complete from "../pages/complete/Complete";
import Profile from "../pages/profile/Profile";
import UserUpdate from "../pages/userUpdate/UserUpdate";
import Login from "../pages/login/Login";
import header from "../layout/headaer";
import { context } from "../context/auth";
import LoadingBar from "react-top-loading-bar";
const MyRoute = () => {
  const [user, setUser] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <LoadingBar
        color="#ce06d1"
        height={3}
        loaderSpeed={500}
        transitionTime={200}
        waitingTime={800}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <context.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route
              path="/addgame"
              element={<Add setProgress={setProgress} />}
            ></Route>
            <Route
              path="/allgames"
              element={<Alldata setProgress={setProgress} />}
            ></Route>
            <Route
              path="/main"
              element={<Main setProgress={setProgress} />}
            ></Route>
            <Route
              path="/upcoming"
              element={<Upcoming setProgress={setProgress} />}
            ></Route>
            <Route
              path="/complite"
              element={<Complete setProgress={setProgress} />}
            ></Route>
            <Route
              path="/notcomplite"
              element={<Notcomplete setProgress={setProgress} />}
            ></Route>
            <Route path="/logout" element={header}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/userUpdate/:id" element={<UserUpdate />}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </context.Provider>
    </div>
  );
};

export default MyRoute;
