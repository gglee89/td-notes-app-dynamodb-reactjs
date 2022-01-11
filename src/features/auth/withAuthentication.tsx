import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import * as authReducer from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { CircularProgress, Grid, Typography } from '@mui/material';

export default (WrappedComponent: React.ComponentType) => {
  const WithAuth = <T,>(props: T) => {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log('useEffect isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
      dispatch(authReducer.isLoggedIn(''))
        .then(unwrapResult)
        .then((payload) => {
          setLoading(false);
          const { pathname, search } = location;
          if (!payload) {
            return navigate('/login');
          }
          if (payload?.message !== 'OK') {
            return navigate('/login');
          }
          return pathname !== '/login' ? navigate(`${pathname}${search}`) : navigate('/');
        })
        .catch((error) => {
          return navigate('/login');
        });
    }, []);

    if (loading) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3} alignItems="center" justifyContent="center">
            <CircularProgress />
            <Typography variant="subtitle1" mt={5}>
              Loading...
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return <WrappedComponent {...props} />;
  };
  WithAuth.displayName = 'withAuthentication';
  return WithAuth;
};
