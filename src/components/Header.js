import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_SUCCESS, getPost, getUserprofile, logout } from "../redux/action";
import React, { useEffect } from "react";

// const link = {
//   textDecoration: "none",
//   color: "var(--colortext)",
//   fontSize: 25,
//   marginRight: 20
// };
// export const header = {
//   backgroundColor: "var(--background)",
//   color: "var(--colortext)",
//   height: 80,
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: 20,
//   width: "100%"
// };
function Header() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  function logoutclick() {
    dispatch({
      type:LOGOUT_SUCCESS
    })
    navigate("/");
  }
  // useEffect(() => {
  //     if (user!=null && user.loginning == false) {
  //       navigate("/");
  //     }
  //   }, [user]);
  function homeclick() {
    dispatch(getPost());
  }
  function userprofileclick() {
    dispatch(getUserprofile(state.posts, state.user));
  }
  return (
    <div className="header">
      <h2 className="logotext">
        zoopee
      </h2>
      <div className="header-link-wrap"
      >
        <Link to="/home" className="header-link" onClick={() => homeclick()}>
          Home
        </Link>
        <Link to="/userprofile" className="header-link" onClick={() => userprofileclick()}>
          Profile
        </Link>
        <Link to="/addnewpost" className="header-link">
          New Post
        </Link>
        <Link to="/" className="header-link" onClick={() => logoutclick()}>
          Logout
        </Link>
      </div>
    </div>
  );
}
export default Header;
