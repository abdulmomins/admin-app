import React, { useState, useEffect } from "react";
import "./main.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
const Main = ({ setProgress }) => {
  const [alldata, setalldata] = useState([]);
  const [complete, setcomplete] = useState([]);
  const [notcomplete, setnotcomplete] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  // all data fatch ---------- start
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 500);
    axios
      .get("/user/users")
      .then((res) => {
        setalldata(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // all data fatch ---------- end

  // complete data fatch ---------- start
  useEffect(() => {
    axios
      .get("/user/complete")
      .then((res) => {
        setcomplete(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // complete data fatch ---------- end

  // notcomplete data fatch ---------- start
  useEffect(() => {
    axios
      .get("/user/notcomplete")
      .then((res) => {
        setnotcomplete(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // notcomplete data fatch ---------- end

  // upcoming data fatch ---------- start
  useEffect(() => {
    axios
      .get("/user/upcoming")
      .then((res) => {
        setupcoming(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // upcoming data fatch ---------- end

  return (
    <div className="mainDiv">
      <div className="row">
        {/* colum one start */}
        <div className="column">
          <div className="card">
            <h3>
              <FontAwesomeIcon icon={faGamepad} />
              All Games
            </h3>
            <h1>{alldata.length}</h1>
          </div>
        </div>
        {/* colum one end */}

        {/* colum two start */}
        <div className="column">
          <div className="card">
            <h3>
              <FontAwesomeIcon icon={faGamepad} />
              Complite Games
            </h3>
            <h1>{complete.length}</h1>
          </div>
        </div>
        {/* colum two end */}

        {/* colum two start */}
        <div className="column">
          <div className="card">
            <h3>
              <FontAwesomeIcon icon={faGamepad} />
              Not Complite
            </h3>
            <h1>{notcomplete.length}</h1>
          </div>
        </div>
        {/* colum two end */}

        {/* colum two start */}
        <div className="column">
          <div className="card">
            <h3>
              <FontAwesomeIcon icon={faGamepad} />
              Upcoming Games
            </h3>
            <h1>{upcoming.length}</h1>
          </div>
        </div>
        {/* colum two end */}
      </div>
    </div>
  );
};

export default Main;
