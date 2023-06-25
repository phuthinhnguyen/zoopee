import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import "../App.css";
// import { header } from "./Header";
import {
  BsYoutube,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest
} from "react-icons/bs";
import { signup } from "../redux/action";

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
    if (!form.admintoken || form.admintoken=="") {
      dispatch(signup({...form,role:"user"}))
      setForm({})
    }
    else {
      if (form.admintoken != "@@@") {
        alert("Your token is wrong.")
      }
      else if (form.admintoken == "@@@") {
        dispatch(signup({...form,role:"admin"}))
        setForm({})
      }
    }
  }
  return (
    <div>
      <div className="header">
        <h2
          className="logotext"
        >
          zoopee
        </h2>
        <div style={{ width: 200 }}>
          <BsYoutube
            className="header-icon" style={{ fontSize: 25 }}
          />
          <BsFacebook
            className="header-icon"
          />
          <BsInstagram
            className="header-icon"
          />
          <BsTwitter
            className="header-icon"
          />
          <BsPinterest className="header-icon" style={{ marginRight: 0 }} />
        </div>
      </div>
      <div
        className="signup-body"
      >
        <Formik
          initialValues={form}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="formsignup">
              <div
                className={`custom-input ${errors.name ? "custom-input-error" : ""
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
                className={`custom-input ${errors.email ? "custom-input-error" : ""
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
                className={`custom-input ${errors.username ? "custom-input-error" : ""
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
                className={`custom-input ${errors.password ? "custom-input-error" : ""
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
                className={`custom-input ${errors.confirmpassword ? "custom-input-error" : ""
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
              <div
                className={`custom-input`}
              >
                <div className="group-input-signup">
                  <label style={{ maxWidth: 150 }}>For admin, please input your token</label>
                  <input
                    type="text"
                    name="admintoken"
                    value={form.admintoken || ""}
                    onChange={handleChange}
                  />
                </div>
                <p className="error">{errors.confirmpassword}</p>
              </div>
              <button type="submit" className="button-signup">Sign Up</button>
              <br></br>
            </form>
          )}
        </Formik>
      </div>
    
    </div>
  );
}
export default Signup;
