import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_SUCCESS, getPost, login } from "../redux/action";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Alertinfo from "./Alertinfo";
import Collapse from '@mui/material/Collapse';
import { signup } from "../redux/action";
import { VscTriangleUp } from 'react-icons/vsc';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  // console.log(open1)
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };
  // const closealert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // const openalert = () => {
  //   setOpen(true);
  // };
  const [formlogin, setFormlogin] = useState({
    username: "",
    password: "",
    errormessage: { username: "", password: "" }
  });
  const [formsignup, setFormsignup] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
    admintoken: "",
    errormessage: { name: "", email: "", username: "", password: "", confirmpassword: "", admintoken: "" }
  });
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
      if (state.user.checkloginresult == "Login successfully") {
        navigate("/home")
      }
      else setOpen(true)
      // else enqueueSnackbar(state.user.checkloginresult, "success" );
    }
  }, [state.user]);

  const closealert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  };

  function handleChangelogin(event) {
    setFormlogin({
      ...formlogin,
      [event.target.name]: event.target.value
    });

  }
  function handleChangesignup(event) {
    setFormsignup({
      ...formsignup,
      [event.target.name]: event.target.value
    });
  }
  // function handleValidate() {
  //   const errors = {};
  //   if (!form.email) {
  //     errors.email = "Required";
  //   } else if (!REGEX.email.test(form.email)) {
  //     errors.email = "Invalid email address";
  //     console.log("code");
  //   }
  //   if (!form.username) {
  //     errors.username = "Username is required";
  //   }
  //   if (!form.password) {
  //     errors.password = "Password is required";
  //   }

  //   if (!formsignup.name) {
  //     errors.name = "Required";
  //   }
  //   if (!formsignup.email) {
  //     errors.email = "Required";
  //   } else if (!REGEX.email.test(form.email)) {
  //     errors.email = "Invalid email address";
  //   }
  //   if (!formsignup.usernamesignup) {
  //     errors.usernamesignup = "Required";
  //   }
  //   if (!formsignup.passwordsignup) {
  //     errors.passwordsignup = "Required";
  //   }
  //   if (!formsignup.confirmpassword) {
  //     errors.confirmpassword = "Required";
  //   } else if (formsignup.password != form.confirmpassword) {
  //     errors.confirmpassword = "Password and Confirmpassword are not matched";
  //   }
  //   return errors;
  // }
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

  function handleSubmitlogin(event, formlogin) {
    event.preventDefault();
    let errors = { username: "", password: "" }
    if (formlogin.username == "") {
      errors.username = "Username is required";
    }
    else errors.username = "";
    if (formlogin.password == "") {
      errors.password = "Password is required";
    }
    else errors.password = "";
    setFormlogin({
      ...formlogin,
      errormessage: { username: errors.username, password: errors.password }
    });
    if (formlogin.username != "" && formlogin.password !== "") {
      dispatch(login(formlogin));
    }
  }


  function handleSubmitsignup(event, formsignup) {
    event.preventDefault();
    let errors = { name: "", email: "", username: "", password: "", confirmpassword: "", admintoken: "" }
    if (formsignup.name == "") {
      errors.name = "Name is required";
    }
    else errors.name = "";
    if (formsignup.email == "") {
      errors.email = "Email is required";
    }
    else if (!REGEX.email.test(formsignup.email)) {
      errors.email = "Invalid email address";
    }
    else errors.email = "";
    if (formsignup.username == "") {
      errors.username = "Username is required";
    }
    else errors.username = "";
    if (formsignup.password == "") {
      errors.password = "Password is required";
    }
    else errors.password = "";
    if (formsignup.confirmpassword == "") {
      errors.confirmpassword = "Confirm password is wrong";
    }
    else errors.confirmpassword = "";
    setFormsignup({
      ...formsignup,
      errormessage: { name: errors.name, email: errors.email, username: errors.username, password: errors.password, confirmpassword: errors.confirmpassword }
    });
    if (formsignup.name != "" && formsignup.email != "" && formsignup.username != "" && formsignup.password != "" && formsignup.confirmpassword != "" && errors.email == "") {
      if (!formsignup.admintoken || formsignup.admintoken == "") {
        dispatch(signup({ ...formsignup, role: "user" }))
        // setFormsignup({})
      }
      else {
        if (formsignup.admintoken != "@@@") {
          alert("Your token is wrong.")
        }
        else if (formsignup.admintoken == "@@@") {
          dispatch(signup({ ...formsignup, role: "admin" }))
          // setFormsignup({})
        }
      }
    }

  }
  const showcollapse = () => {
    setChecked(true)
  }
  const hidecollapse = () => {
    setChecked(false)
  }

  return (
    <div>
      <div className="header">
        <h2
          className="logotext"
        >
          zoopee
        </h2>
        <form onSubmit={(e) => handleSubmitlogin(e, formlogin)} className="formlogin">
          <div>
            <div
              className={`${formlogin.errormessage.username != "" ? "custom-input-error" : ""
                } login`}
            >
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formlogin.username}
                onChange={(event) => handleChangelogin(event)}
              />
            </div>
            <p className="error">{formlogin.errormessage.username}</p>
          </div>
          <div>
            <div
              className={`${formlogin.errormessage.password != "" ? "custom-input-error" : ""
                } login`}
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formlogin.password}
                onChange={(event) => handleChangelogin(event)}
              />

            </div>
            <p className="error">{formlogin.errormessage.password}</p>
          </div>

          <button type="submit" className="button-login">Login</button>
        </form>
        <button className="button-login" onClick={showcollapse}>Sign up</button>
      </div>
      
      <Collapse in={checked} timeout={1000}>
        <div
          className="signup-body"
        >
          
          <form onSubmit={(e) => handleSubmitsignup(e, formsignup)} className="formsignup">
            <div className="formsignup-wrap">
              <div className="formsignup-items-wrap">
                <div
                  className={`custom-input ${formsignup.errormessage.name != "" ? "custom-input-error" : ""
                    } `}
                >
                  <div className="group-input-signup">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formsignup.name}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                  <p className="error">{formsignup.errormessage.name}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.email ? "custom-input-error" : ""
                    }`}
                >
                  <div className="group-input-signup">
                    <label>E-mail</label>
                    <input
                      type="text"
                      name="email"
                      value={formsignup.email}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.email}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.username ? "custom-input-error" : ""
                    }`}
                >
                  <div className="group-input-signup">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formsignup.username}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.username}</p>
                </div>
              </div>
              <div className="formsignup-items-wrap">
                <div
                  className={`custom-input ${formsignup.errormessage.password ? "custom-input-error" : ""
                    }`}
                >
                  <div className="group-input-signup">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formsignup.password}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>

                  <p className="error">{formsignup.errormessage.password}</p>
                </div>
                <div
                  className={`custom-input ${formsignup.errormessage.confirmpassword ? "custom-input-error" : ""
                    }`}
                >
                  <div className="group-input-signup">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      name="confirmpassword"
                      value={formsignup.confirmpassword || ""}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                  <p className="error">{formsignup.errormessage.confirmpassword}</p>
                </div>
                <div
                  className={`custom-input`}
                >
                  <div className="group-input-signup">
                    <label style={{ maxWidth: 150 }}>For admin, please input your token</label>
                    <input
                      type="text"
                      name="admintoken"
                      value={formsignup.admintoken || ""}
                      onChange={(event) => handleChangesignup(event)}
                    />
                  </div>
                  {/* <p className="error">{formsignup.errormessage.confirmpassword}</p> */}
                </div>
              </div>
            </div>
            <button type="submit" className="button-signup">Sign Up</button>
          </form>
          <button onClick={hidecollapse} className="closecollapse"><VscTriangleUp className="closecollapse-icon" style={{fontSize:90,color:"var(--boldyellow)"}}/></button>
        </div>
        
      </Collapse>
      <div
        className="login-body"
      >
        <iframe src="creativeScroll.html" style={{ width: "100%", height: "100%" }}></iframe>
        {/* <Link to="/signup">Sign up here</Link> */}
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={closealert} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} TransitionComponent={SlideTransition}>
        <Alert onClose={closealert} severity="error" sx={{ width: '100%', marginBottom: 4, marginRight: 2, backgroundColor: "var(--backgroundbody)", color: "var(--error)" }}>
          {state.user != null && state.user.checkloginresult}
        </Alert>
      </Snackbar>
    </div>
  );
}
// export default function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//     open={open}
//     message="I love snacks"
//     severity="error"
//     key={{vertical: 'bottom', horizontal: 'center'}}>
//       <Login />
//     </SnackbarProvider>
//   );
// }
export default Login;
