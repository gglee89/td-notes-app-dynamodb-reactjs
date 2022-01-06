import React, { useEffect } from 'react';
import Login from '../login/Login';
import * as authReducer from './authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const withAuthentication = (WrappedComponent: React.ComponentType) => {
  const WithAuth = <T,>(props: T) => {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
      dispatch(authReducer.isLoggedIn(''));
    }, []);

    if (!isLoggedIn) return <Login />;
    return <WrappedComponent {...props} />;
  };
  WithAuth.displayName = 'withAuthentication';
  return WithAuth;
};

export default withAuthentication;
