import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, login } from "../redux/action";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  const [form, setForm] = useState({});
  useEffect(() => {
    dispatch(login(form));
  }, [])
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
        type:LOGIN_SUCCESS,
        payload:getusername
      })
      navigate("/home");
    } else if (getusername[0].password != form.password) {
      alert("Username and password are not matched");
    }
  }


  function handleSubmit() {
    checkuser()
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
              className={`custom-input ${errors.username ? "custom-input-error" : ""
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
              className={`custom-input ${errors.password ? "custom-input-error" : ""
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
