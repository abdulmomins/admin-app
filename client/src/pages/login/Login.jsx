import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
const Login = () => {
  const initialValues = {
    email: "admin@gmail.com",
    password: "123456",
  };
  const loginPro = async (credentials) => {
    try {
      const { data } = await axios.post(`/admin/login`, credentials, {
        method: "POST",
      });
      if (data.error) {
        toast.error(data.error, {
          className: "error-toast",
        });
      } else {
        toast.success("Login successfull...!", {
          className: "success-toast",
        });
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      loginPro(values);
    },
  });
  return (
    <>
      <div className="container">
        <form id="login" onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="fromGroup">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="fromGroup">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="fromGroup">
            <button type="submit" id="btn">
              NEXT
            </button>
          </div>
          <div className="link">
            <Link to="/register">Sign Up</Link>
            <Link to="/register">Forget Password</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
