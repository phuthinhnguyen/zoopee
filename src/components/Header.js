import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_SUCCESS,
  getPost,
  getUserprofile,
  logout
} from "../redux/action";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { Hidden } from "@mui/material";

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
function Header(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Profile", "Account", "Logout"];
  function logoutclick() {
    dispatch({
      type: LOGOUT_SUCCESS
    });
    window.localStorage.setItem("login", false);
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
  function settingsclick() {}
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const userrole = props.userrole

  return (
    <div className="header">
      <h2 className="logotext">zoopee</h2>
      <div className="header-link-wrap">
        <Link to="/home" className="header-link" onClick={() => homeclick()}>
          Home
        </Link>
        {/* <Link to="/userprofile" className="header-link" onClick={() => userprofileclick()}>
          My Profile
        </Link> */}
        <Link to="/addnewpost" className="header-link">
          New Post
        </Link>
        {userrole == "admin" && (
          <Link to="/adminworkspace" className="header-link">
            Admin
          </Link>
        )}
        {/* <Link to="/" className="header-link" onClick={() => logoutclick()}>
          Logout
        </Link> */}
        {/* <Navbar /> */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={state.user.name} src={state.user.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu} style={{ marginTop: 0 }}>
              <Link
                to="/userprofile"
                className="usermenu"
                onClick={() => userprofileclick()}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} style={{}}>
              {/* <Typography textAlign="center">{setting}</Typography> */}
              <Link className="usermenu" onClick={() => settingsclick()}>
                Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} style={{ marginBottom: 0 }}>
              <Link to="/" className="usermenu" onClick={() => logoutclick()}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
}
export default Header;
