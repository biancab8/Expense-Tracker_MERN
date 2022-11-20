//from material ui template for sign in
import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import colors from "../assets/colors";
import { authAPI } from "../api";
import { useState } from "react";
import { ErrorMessage } from "../features/ui";
import { primaryButtonTheme } from "../features/ui/buttons/ButtonPrimary";
import { Loading } from "../features/ui";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const res = await authAPI.login(formData);
      if (res.ok) {
        const { token, user } = await res.json();
        Cookie.set("token", token);
        dispatch(setUser(user));
        setLoading(false);
        navigate("/");
      } else {
        const { message } = await res.json();
        setErrorMsg(message);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            theme={primaryButtonTheme}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              color: colors.textPrimary,
            }}
          >
            Log In
          </Button>
          {errorMsg.length > 0 && <ErrorMessage msg={errorMsg} />}
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {loading ? <Loading/>: null}
    </Container>
  );
}
