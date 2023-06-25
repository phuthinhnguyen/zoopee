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
  const [open,setOpen] = useState(false)
  // const { enqueueSnackbar } = useSnackbar();
  // console.log(open1)
  // const REGEX = {
  //   email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  // };
  // const closealert = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // const openalert = () => {
  //   setOpen(true);
  // };
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
      if(state.user.checkloginresult == "Login successfully"){
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
      <Snackbar open={open} autoHideDuration={4000} onClose={closealert}  anchorOrigin={{ vertical:"bottom", horizontal:"right" }}  TransitionComponent={SlideTransition}>
        <Alert onClose={closealert} severity="error" sx={{ width: '100%',marginBottom: 4,marginRight: 2,backgroundColor:"var(--backgroundbody)",color:"var(--error)"}}>
          {state.user!=null && state.user.checkloginresult}
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
