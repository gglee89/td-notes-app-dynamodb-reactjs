import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

// OAuth 2.0
import loadGoogleScript from '../../services/google/load';

// Features
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Actions
import { authLoading, authSuccess, authFailure } from '../auth/authSlice';

// HOC
import withAuthentication from '../auth/withAuthentication';

// Interface
declare global {
  interface Window {
    gapi?: any;
  }
}

interface GoogleAuth {
  signOut?: any;
}

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com">
        Genealogy Care App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Login: React.FC = () => {
  const { loading, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const wGapi = window.gapi;
  const renderSigninButton = (gapiArg: any) => {
    gapiArg.signin2.render('google-signin', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: false,
      theme: 'dark',
      onload: () => dispatch(authLoading()),
      onsuccess: async (response: any) => {
        const profile = response.getBasicProfile();
        localStorage.setItem('id_token', response.getAuthResponse().id_token);
        dispatch(
          authSuccess({
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl(),
          })
        );
      },
      onfailure: (error: string) => {
        dispatch(authFailure(error));
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (wGapi) renderSigninButton(wGapi);
  }, [wGapi]);

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
          Sign in
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
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {!isLoggedIn && loading ? (
        <CircularProgress size="small" />
      ) : (
        <Box id="google-signin" justifyContent="center" display="flex" mt={5}></Box>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default withAuthentication(Login);
