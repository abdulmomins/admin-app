import React, { useState, useEffect } from "react";
import "./notcomplete.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Main = ({ setProgress }) => {
  const [notcomplete, setnotcomplete] = useState([]);

  //==================== pagination useState ===================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastInedex = currentPage * recordsPerPage;
  const firstIndex = lastInedex - recordsPerPage;
  const records = notcomplete.slice(firstIndex, lastInedex);
  const npage = Math.ceil(notcomplete.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  //==================== pagination useState ===================

  // ========================= pagination function ===================
  function perPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changepage(id) {
    setCurrentPage(id);
  }
  // ========================= pagination function ===================

  // complete data fatch ---------- start
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 500);
    axios
      .get("/user/notcomplete")
      .then((res) => {
        setnotcomplete(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // complete data fatch ---------- end

  return (
    <div className="mymain">
      <div className="mainCard">
        <h3>Not Complete</h3>
        <div className="cardRow">
          <div className="cardColumn">
            {records.map((data, index) => {
              return (
                <div key={index} className="card1">
                  <img className="cardImg" src={data.profile} alt="people" />
                  <div className="cardDetails">
                    <h5 className="cardTitle">{data.name}</h5>
                    <h6 className="cardTile">{data.status}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ul id="pagination1">
          <li id="page-item1">
            <Link to="#" className="page-link1" onClick={perPage}>
              Prev
            </Link>
          </li>
          {numbers.map((n, i) => {
            return (
              <li
                className={`page-item2 ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <Link
                  to="#"
                  className="page-link2"
                  onClick={() => changepage(n)}
                >
                  {n}
                </Link>
              </li>
            );
          })}
          <li id="page-item1">
            <Link to="#" className="page-link1" onClick={nextPage}>
              Next
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
