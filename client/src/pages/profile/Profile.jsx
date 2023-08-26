// import external module ----------- start
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
// import external module ----------- end

// import internal module ------------start
import convertToBase64 from "../../helper/Converter";
import { context } from "../../context/auth";
import "./profile.css";
// import internal module ------------ end

// update profile main function -------------- start

const Profile = () => {
  // stor  essensial variable  ------------ start
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const { user, setUser } = useContext(context);
  // stor  essensial variable  ------------ end

  // initialvalues  ------------------ start
  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    password: user.password || "",
    gender: user.gender || "",
  };
  // initialvalues  ------------------  end

  // update profile logic -----------------------start
  const updateProfile = async (credentials) => {
    try {
      const { data } = await axios.patch(`/admin/updateuser`, credentials);
      if (data.error) {
        toast.error(data.error, {
          className: "error-toast",
        });
      } else {
        toast.success("Update  Successfull...!", {
          className: "success-toast",
        });
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update profile logic ----------------------- end

  // update profile data submit ------------------ start

  const handleSubmit = async (values) => {
    values = await Object.assign(values, { profile: file || "" });
    updateProfile(values);
  };
  // update profile data submit ------------------ end

  // gender selection --------------- start
  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  // gender selection --------------- end

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //show profile data ------------------------- start
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/adminuser");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //show profile data ------------------------- end

  return (
    <>
      {/* update profile  start */}
      <div className="profileCon">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form id="profile">
            {/* show profile  start */}
            <div className="image">
              <img src={user.profile} alt={user.name} />
            </div>
            <div className="border"></div>
            <div className="mainprofileinput">
              <div className="profileDiv">
                {/* input field  start 1 */}
                <div className="profileGroup">
                  <label htmlFor="profilepic">Profile</label>
                  <input
                    type="file"
                    id="profilepic"
                    onChange={onUpload}
                    name="profile"
                  />
                </div>
                <div className="profileGroup">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              {/* input field  end 1 */}

              {/* input field  start 2 */}
              <div className="profileDiv">
                <div className="profileGroup ml">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                  />
                </div>
                <div className="profileGroup ml">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your Password"
                  />
                </div>
              </div>
              {/* input field  end 2 */}

              {/*  input field start 3 */}
              <div className="profileDiv">
                <div className="profileGroup ml">
                  <label htmlFor="phone">Phone</label>
                  <Field
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone"
                  />
                </div>
                {/* gender option  start */}
                <div className="profileGroup ml">
                  <label htmlFor="gender">Gender</label>
                  <Field
                    as="select"
                    className="gender"
                    id="gender"
                    name="gender"
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
                {/* gender option end */}
              </div>
              {/*  input field end 3 */}
            </div>

            {/* update button  start */}
            <div className="updatebtn">
              <button id="btn" type="submit">
                Update
              </button>
            </div>
            {/* update button end */}
          </Form>
        </Formik>
      </div>
      {/* update profile  start */}
    </>
  );
};

export default Profile;

// update profile main function -------------- end
