import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, getPost, login } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import {
  BsYoutube,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest
} from "react-icons/bs";
import { header } from "./Header";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  const [form, setForm] = useState({});
  useEffect(() => {
    let iscancel = false;
    if (!iscancel) {
      dispatch(login());
    }
    return () => {
      iscancel = true;
    };
  }, []);
  // useEffect(() => {
  //   console.log(state)
  //     if (state.allusers != null) {

  //       checkuser()

  //     } else if (state.allusers == null) {
  //       navigate("/");
  //     }

  // }, [state.allusers]);

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
  function checkuser() {
    const getusername = state.allusers.filter(
      (item) => item.username == form.username
    );
    if (getusername.length == 0) {
      alert("Username is not exists");
    } else if (getusername[0].password == form.password) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: getusername[0]
      });
      navigate("/home");
      dispatch(getPost());
    } else if (getusername[0].password != form.password) {
      alert("Username and password are not matched");
    }
  }

  function handleSubmit() {
    checkuser();
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
        <Formik
          initialValues={form}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ errors, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="formlogin">
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
              <button type="submit">Login</button>
              <br></br>
            </form>
          )}
        </Formik>
      </div>
      <div
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dhva3lwfk/image/upload/v1686124303/cld-sample-3.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "90vh"
        }}
      >
        <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
}
