import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import "../App.css";
import { header } from "./Header";
import {
  BsYoutube,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest
} from "react-icons/bs";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  const [form, setForm] = useState({});
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};

    if (!form.name) {
      errors.name = "Required";
    }
    if (!form.email) {
      errors.email = "Required";
    } else if (!REGEX.email.test(form.email)) {
      errors.email = "Invalid email address";
    }
    if (!form.username) {
      errors.username = "Required";
    }
    if (!form.password) {
      errors.password = "Required";
    }
    if (!form.confirmpassword) {
      errors.confirmpassword = "Required";
    } else if (form.password != form.confirmpassword) {
      errors.confirmpassword = "Password and Confirmpassword are not matched";
    }

    return errors;
  }

  function handleSubmit() {
    alert("Sign up successfully");
  }
  return (
    <div>
      {/* <Header /> */}
      <div style={header}>
        <h2
          className="col-8"
          style={{
            fontSize: 50,
            cursor: "pointer",
            userSelect: "none",
            marginLeft: 20
          }}
        >
          zoopee
        </h2>
        <div style={{ width: 200 }}>
          <BsYoutube
            style={{ fontSize: 25, marginRight: 15, cursor: "pointer" }}
          />
          <BsFacebook
            style={{ fontSize: 20, marginRight: 15, cursor: "pointer" }}
          />
          <BsInstagram
            style={{ fontSize: 20, marginRight: 15, cursor: "pointer" }}
          />
          <BsTwitter
            style={{ fontSize: 20, marginRight: 15, cursor: "pointer" }}
          />
          <BsPinterest style={{ fontSize: 20, cursor: "pointer" }} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage:
            "url('https://res.cloudinary.com/dhva3lwfk/image/upload/v1686124303/cld-sample-3.jpg')",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <h1>Sign Up</h1>
        <Formik
          initialValues={form}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="formsignup">
              <div
                className={`custom-input ${
                  errors.name ? "custom-input-error" : ""
                } `}
              >
                <div className="group-input-signup">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <p className="error">{errors.name}</p>
              </div>
              <div
                className={`custom-input ${
                  errors.email ? "custom-input-error" : ""
                }`}
              >
                <div className="group-input-signup">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <p className="error">{errors.email}</p>
              </div>
              <div
                className={`custom-input ${
                  errors.username ? "custom-input-error" : ""
                }`}
              >
                <div className="group-input-signup">
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
              <div
                className={`custom-input ${
                  errors.password ? "custom-input-error" : ""
                }`}
              >
                <div className="group-input-signup">
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
              <div
                className={`custom-input ${
                  errors.confirmpassword ? "custom-input-error" : ""
                }`}
              >
                <div className="group-input-signup">
                  <label>Confirm password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={form.confirmpassword || ""}
                    onChange={handleChange}
                  />
                </div>
                <p className="error">{errors.confirmpassword}</p>
              </div>
              <button type="submit">Sign Up</button>
              <br></br>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default Signup;
