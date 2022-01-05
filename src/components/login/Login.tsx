import React, { useEffect, useState } from 'react';
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
import loadGoogleScript from '../../services/google/load';

declare global {
  interface Window {
    gapi: any;
  }
}

interface GoogleAuth {
  signOut: any;
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

const theme = createTheme();
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const Login = () => {
  const [googleAuth, setGoogleAuth] = useState<GoogleAuth>({
    signOut: () => {},
  });
  const [gapi, setGapi] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onSuccess = (googleUser: any) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };

  const onFailure = (error: any) => {
    setIsLoggedIn(false);
    setStatus(error);
  };

  const renderSigninButton = (gapiArg: any) => {
    gapiArg.signin2.render('google-signin', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  };

  const logOut = () => {
    (async () => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };

  useEffect(() => {
    window.onGoogleScriptLoad = () => {
      const WGapi = window.gapi;
      WGapi.load('auth2', () => {
        (async () => {
          const GoogleAuth = await WGapi?.auth2?.init({
            client_id: googleClientId,
          });
          setGoogleAuth(GoogleAuth);
          renderSigninButton(WGapi);
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
