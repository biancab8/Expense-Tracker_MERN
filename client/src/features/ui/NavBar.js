import * as React from "react";
import {AppBar, Box, Toolbar, Typography, Button,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../auth/authSlice";
import {colors} from "../../assets"

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  function logout() {
    Cookie.remove("token");
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: colors.tableBackgroundPrimary, color: colors.textSecondary, }}> 
      {/* display: "inline-flex" */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              Expense Tracker
            </Link>
          </Typography>
          {isAuthenticated && (
            <Link to="/categories" className="text-white">
              <Button color="inherit">Edit Categories</Button>
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
    // </Box>
  );
}
