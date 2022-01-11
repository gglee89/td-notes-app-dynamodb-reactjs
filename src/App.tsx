import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import User from './features/user/User';
import Login from './features/login/Login';

// HOC
import withInitializer from './features/auth/withInitializer';

// Interfaces
// interface RequireAuthProps {
//   children: JSX.Element;
//   redirectTo: string;
// }

// const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
//   const { isLoggedIn: isAuth } = useAppSelector((state) => state.auth);
//   return isAuth ? children : <Navigate to={redirectTo} />;
// };

const theme = createTheme();
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default withInitializer(App);
