import React from 'react';

// Components
import User from './features/user/User';

// HOC
import withAuthentication from './features/auth/withAuthentication';

const App = () => {
  return <User />;
};

export default withAuthentication(App);
