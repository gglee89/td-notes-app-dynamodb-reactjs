import React, { useEffect } from 'react';
import Login from '../login/Login';
import * as authReducer from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { Box, CircularProgress } from '@mui/material';

const withAuthentication = (WrappedComponent: React.ComponentType) => {
  const WithAuth = <T,>(props: T) => {
    const dispatch = useAppDispatch();
    const { loading, isLoggedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
      dispatch(authReducer.isLoggedIn(''));
    }, []);

    if (loading)
      return (
        <Box alignItems={'center'} display={'flex'} justifyContent={'center'} width={1}>
          <CircularProgress />
        </Box>
      );

    if (!isLoggedIn) return <Login />;
    return <WrappedComponent {...props} />;
  };
  WithAuth.displayName = 'withAuthentication';
  return WithAuth;
};

export default withAuthentication;
