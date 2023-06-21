import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/action";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  const [form, setForm] = useState({});
  useEffect(() => {
    if (user != null && user.loginning == true) {
      navigate("/home");
    } else if (user != null && user.loginning == false) {
      navigate("/");
    }
  }, [user]);
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
      errors.username = "Required";
    }
    if (!form.password) {
      errors.password = "Required";
    }
    return errors;
  }

  function handleSubmit() {
    dispatch(login(form));
  }

  return (
    <div>
      {/* <Header /> */}
      <h1>Sign in</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div
              className={`custom-input ${
                errors.username ? "custom-input-error" : ""
              }`}
            >
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.username}</p>
            </div>
            <div
              className={`custom-input ${
                errors.password ? "custom-input-error" : ""
              }`}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password || ""}
                onChange={handleChange}
              />
              <p className="error">{errors.password}</p>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
