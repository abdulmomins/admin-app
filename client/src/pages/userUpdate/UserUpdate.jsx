// import external module --------------- start
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
// import external module --------------- end

// import internal module ================ start
import convertToBase64 from "../../helper/Converter";
import "./userupdate.css";
// import internal module ================ end

// main user data adding function -------------- start
const UpdateUser = () => {
  // stor  essensial variable  ------------ start
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [user, setUser] = useState([]);
  const { id } = useParams();
  // stor  essensial variable  ------------ end
  // all data fatch ---------- start
  useEffect(() => {
    axios
      .get(`/user/user/` + id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // all data fatch ---------- end
  // initialvalues  ------------------ start
  const initialValues = {
    name: "",
    status: "",
    profile: "",
  };
  // initialvalues  ------------------ end

  // adding user data logic -----------------------start
  const updatePro = async (credentials) => {
    try {
      const { data } = await axios.put(`/user/update/` + id, credentials);
      if (data.error) {
        toast.error(data.error, {
          className: "error-toast",
        });
      } else {
        toast.success("User Update Successfully...!", {
          className: "success-toast",
        });
        navigate("/allgames");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // adding user data logic -----------------------end

  // adding user data submit ------------------ start
  const handleSubmit = async (values) => {
    values = await Object.assign(values, { profile: file || "" });
    updatePro(values);
  };
  // adding user data submit ------------------ end

  // gender selection --------------- start
  const genderOptions = [
    { label: "Your Status", value: "" },
    { label: "Complete", value: "complete" },
    { label: "Not Complete", value: "not complete" },
    { label: "Upcoming", value: "upcoming" },
  ];
  // gender selection --------------- end

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <>
      {/* add user from  start */}
      <div className="container">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form id="add">
            <div className="title">
              <img src={user.profile} alt="name" />
            </div>
            <div className="underline"></div>
            {/* input field  start  */}
            <div className="fromGroup">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </div>
            <div className="fromGroup">
              <input type="file" onChange={onUpload} name="profile" />
            </div>
            {/* input field  end */}

            {/* gender option  start */}
            <div className="fromGroup">
              <Field as="select" id="gender" name="status">
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            {/* gender option  end */}

            {/* add user button  start */}
            <div className="fromGroup">
              <button id="btn" type="submit">
                Update User
              </button>
            </div>
            {/* add user button  end */}
          </Form>
        </Formik>
      </div>
      {/* add user from end */}
    </>
  );
};

export default UpdateUser;

// main user data adding function -------------- end
