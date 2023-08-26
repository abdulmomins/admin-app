import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import convertToBase64 from "../../helper/Converter";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { toast } from "react-hot-toast";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "", // New field for select
  };
  const registerPro = async (credentials) => {
    try {
      const { data } = await axios.post(`/admin/register`, credentials);
      if (data.error) {
        toast.error(data.error, {
          className: "error-toast",
        });
      } else {
        toast.success("Registration Successfull...!", {
          className: "success-toast",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (values) => {
    values = await Object.assign(values, { profile: file || "" });
    registerPro(values);
  };

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <>
      <div className="container">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form id="register">
            <div className="fromGroup">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              />
            </div>

            <div className="fromGroup">
              <Field
                type="number"
                id="phone"
                name="phone"
                placeholder="Your Phone"
              />
            </div>

            <div className="fromGroup">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
              />
            </div>
            <div className="fromGroup">
              <input type="file" onChange={onUpload} name="profile" />
            </div>
            <div className="fromGroup">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
              />
            </div>
            <div className="fromGroup">
              <Field as="select" id="gender" name="gender">
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <div className="fromGroup">
              <button id="btn" type="submit">
                Register
              </button>
            </div>
            <div className="link">
              <Link to="/login">Sign In</Link>
              <Link to="/register">Forget Password</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegistrationForm;
