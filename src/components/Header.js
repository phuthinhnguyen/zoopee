import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getUserprofile, logout } from "../redux/action";
import React, { useEffect } from "react";

const link = {
  textDecoration: "none",
  color: "black",
  fontSize: 25,
  marginRight: 20
};
export const header = {
  backgroundColor: "lightyellow",
  color: "black",
  height: 80,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 20,
  width: "100%"
};
function Header() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  function logoutclick() {
    // state.user != null && dispatch(logout(user.id));
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
    <div className="row" style={header}>
      <h2 className="col-8" style={{ fontSize: 50 }}>
        zoopee
      </h2>
      <div
        className="col-4"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Link to="/home" style={link} onClick={() => homeclick()}>
          Home
        </Link>
        <Link to="/userprofile" style={link} onClick={() => userprofileclick()}>
          Profile
        </Link>
        <Link to="/addnewpost" style={link}>
          New Post
        </Link>
        <Link to="/" style={link} onClick={() => logoutclick()}>
          Logout
        </Link>
      </div>
    </div>
  );
}
export default Header;
