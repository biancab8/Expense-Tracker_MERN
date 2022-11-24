import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../user/userSlice";
import { colors } from "../../assets";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  function logout() {
    //delete token from cookies
    Cookie.remove("token");
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.tableBackgroundPrimary,
        color: colors.textSecondary,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="text-white">
            Expense Tracker
          </Link>
        </Typography>
        {isAuthenticated && (
          <Link to="/categories" className="text-white">
            <Button sx={{ marginRight: "20px" }} color="inherit">
              Categories
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-white">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/register" className="text-white">
              <Button color="inherit">Register</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
