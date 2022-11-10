//from material ui template for sign in
import * as React from 'react';
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container,} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Cookie from "js-cookie";
import { useDispatch } from 'react-redux';
import { setUser } from "../features/auth/authSlice";
import colors from '../assets/colors';
import { ButtonPrimary, ButtonSecondary } from '../features/ui';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = 
    {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      }
    });
    if(res.ok){
      //save JWT in Cookie
      const {token, user} = await res.json();
      Cookie.set("token", token)
      dispatch(setUser(user));
      //redirect user to homepage
      navigate("/");
    }

  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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

{/* <ButtonPrimary type="submit" text="Login"/> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: colors.buttonPrimary, color:colors.textPrimary, "&:hover": {
            backgroundColor: `${colors.buttonPrimaryHover} !important`
          } }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}