import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
// OAuth 2.0
import loadGoogleScript from '../../services/google/load';

// Features
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Actions
import { authLoading, authSuccess, authFailure } from '../auth/authSlice';

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

const theme = createTheme();

const Login = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const renderSigninButton = (gapiArg: any) => {
    gapiArg.signin2.render('google-signin', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: (response: any) => {
        const profile = response.getBasicProfile();
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
  const logOut = async () => {
    await window.gapi.signOut();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.onGoogleScriptLoad = () => {
      const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const wGapi = window.gapi;
      wGapi.load('auth2', () => {
        (async () => {
          await wGapi?.auth2?.init({
            client_id: googleClientId,
          });
          renderSigninButton(wGapi);
        })();
      });
    };

    loadGoogleScript();
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
        {!isLoggedIn && <div id="google-signin"></div>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
