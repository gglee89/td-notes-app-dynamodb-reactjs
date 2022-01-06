import React from 'react';

// HOC
import withAuthentication from '../auth/withAuthentication';

const Notes = () => {
  return <h1>Hello Notes</h1>;
};

export default withAuthentication(Notes);
