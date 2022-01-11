import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';

// Actions
import { initializeOAuthService } from '../auth/authSlice';

export default (WrappedComponent: React.ComponentType) => {
  const WithInitializer = <T,>(props: T) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(initializeOAuthService('google'));
    }, []);

    return <WrappedComponent {...props} />;
  };
  WithInitializer.displayName = '';
  return WithInitializer;
};
