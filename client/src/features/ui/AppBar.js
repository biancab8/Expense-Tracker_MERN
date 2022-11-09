import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../auth/authSlice";
import colors from "../../assets/colors"

export default function ButtonAppBar() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: colors.tableBackgroundPrimary, color: colors.textSecondary,}}>
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
    </Box>
  );
}
