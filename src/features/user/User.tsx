import React from 'react';
import { Box, Button, Container } from '@mui/material';

// Features
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Actions
import { logout } from '../auth/authSlice';

// HOC
import withAuthentication from '../auth/withAuthentication';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Container>
      <Box>Hello {user?.name || 'User'}</Box>
      <Box>
        <Button size="large" onClick={() => dispatch(logout(''))}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default withAuthentication(User);
