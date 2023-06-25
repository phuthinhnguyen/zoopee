import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, getPost, login } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Box from "./Post";
// import { header } from "./Header";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  const [form, setForm] = useState({});
  // useEffect(() => {
  //   let iscancel = false;
  //   if (!iscancel) {
  //     dispatch(login());
  //   }
  //   return () => {
  //     iscancel = true;
  //   };
  // }, []);
  useEffect(() => {
    if (state.user != null) {
      navigate("/home")
    }
  }, [state.user]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};
    // if (!form.email) {
    //   errors.email = "Required";
    // } else if (!REGEX.email.test(form.email)) {
    //   errors.email = "Invalid email address";
    //   console.log("code");
    // }
    if (!form.username) {
      errors.username = "Username is required";
    }
    if (!form.password) {
      errors.password = "Password is required";
    }
    return errors;
  }
  // function login() {
  //   const getusername = state.allusers.filter(
  //     (item) => item.username == form.username
  //   );
  //   if (getusername.length == 0) {
  //     alert("Username is not exists");
  //   } else if (getusername[0].password == form.password) {
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: getusername[0]
  //     });
  //     navigate("/home");
  //     dispatch(getPost());
  //   } else if (getusername[0].password != form.password) {
  //     alert("Username and password are not matched");
  //   }
  // }

  function handleSubmit() {
    dispatch(login(form));
  }

  return (
    <div>
      <div className="header">
        <h2
          className="logotext"
        >
          zoopee
        </h2>
        <Formik
          initialValues={form}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="formlogin">
              <div>
                <div
                  className={`custom-input ${errors.username ? "custom-input-error" : ""
                    } login`}
                >
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username || ""}
                    onChange={handleChange}
                  />
                </div>
                <p className="error">{errors.username}</p>
              </div>
              <div>
                <div
                  className={`custom-input ${errors.password ? "custom-input-error" : ""
                    } login`}
                >
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password || ""}
                    onChange={handleChange}
                  />

                </div>
                <p className="error">{errors.password}</p>
              </div>

              <button type="submit" className="button-login">Login</button>
            </form>
          )}
        </Formik>
      </div>
      <div
        className="login-body"
      >
        <iframe src="creativeScroll.html" style={{ width: "100%", height: "100%" }}></iframe>
        {/* <Link to="/signup">Sign up here</Link> */}
      </div>
    </div>
  );
}
