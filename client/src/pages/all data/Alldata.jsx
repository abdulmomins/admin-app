import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./alldata.css";

const Cancele = ({ setProgress }) => {
  const [user, setUser] = useState([]);
  //==================== serach filer useState ==================
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  //==================== serach filer useState ==================

  //==================== pagination useState ===================
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastInedex = currentPage * recordsPerPage;
  const firstIndex = lastInedex - recordsPerPage;
  const records = user.slice(firstIndex, lastInedex);
  const npage = Math.ceil(user.length / recordsPerPage);
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

  // user data fatche --------------------start
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 500);
    alluser();
  }, []);
  // all user function ----------- start
  function alluser() {
    axios
      .get("/user/users")
      .then((res) => {
        setUser(res.data);
        setFilter(res.data);
      })
      .catch((err) => console.log(err));
  }
  // all user function ----------- end

  //search filter logic-------------- start
  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      const searchdata = user.filter((item) =>
        item.name.toLowerCase().includes(getSearch)
      );
      setUser(searchdata);
    } else {
      setUser(filter);
    }
    setQuery(getSearch);
  };
  //search filter logic-------------- end

  // user data deleted --------------------start
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`/user/deleted/${id}`, id);
    if (!data.error) {
      toast.error(data.error, {
        className: "error-toast",
      });
    } else {
      toast.success("User Deleted Successfully", {
        className: "success-toast",
      });
      alluser();
    }
  };
  // user data deleted --------------------end

  return (
    <div className="tabilcon">
      <div className="tableserch">
        <div className="search">
          <input
            type="text"
            name="name"
            value={query}
            onChange={(e) => handlesearch(e)}
            placeholder="Search for users"
          />
        </div>
      </div>
      <table>
        <thead
          style={{
            textTransform: "uppercase",
            background: " rgba(55, 65, 81,1)",
            color: "rgba(156, 163, 175,1)",
            fontSize: "0.75rem",
            lineHeight: "1rem",
          }}
        >
          <tr>
            <th scope="col" className="px-6">
              <div id="dataid">#</div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Device
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map((data, index) => {
            return (
              <tr key={index} className="tablerow">
                <td className="idwith">
                  <div className="dataid">{index + 1}</div>
                </td>
                <th scope="row" className="flex">
                  <img src={data.profile} alt="images" width={60} />
                  <div className="pl-3">
                    <div className="font-size">{data.name}</div>
                  </div>
                </th>
                <td>
                  <div className="deviceStatus">Pc</div>
                </td>
                <td>
                  <div className="status">{data.status}</div>
                </td>

                <td>
                  <div className="tablelink">
                    <Link
                      className="btn-primary"
                      to={`/userUpdate/${data._id}`}
                    >
                      Edit user
                    </Link>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <Link to="#" className="page-link" onClick={perPage}>
              Prev
            </Link>
          </li>
          {numbers.map((n, i) => {
            return (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => changepage(n)}
                >
                  {n}
                </Link>
              </li>
            );
          })}
          <li className="page-item">
            <Link to="#" className="page-link" onClick={nextPage}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Cancele;
