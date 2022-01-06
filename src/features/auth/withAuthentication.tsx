import React, { useEffect } from 'react';
import Login from '../login/Login';
import { isLoggedIn } from './authSlice';
import { useAppDispatch } from '../../app/hooks';

const withAuthentication = (WrappedComponent: React.ComponentType) => {
  const WithAuth = <T,>(props: T) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(isLoggedIn('https://jsonplaceholder.typicode.com/users/1'));
      console.log('from authentication');
    }, []);

    // if (!isLoggedIn) return <Login />;
    return <WrappedComponent {...props} />;
  };
  WithAuth.displayName = 'withAuthentication';
  return WithAuth;
};

export default withAuthentication;
