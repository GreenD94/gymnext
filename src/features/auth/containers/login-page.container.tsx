'use client';

import { LoginForm } from '../components/login-form.component';
import { useLogin } from '../hooks/use-login.hook';
import { Container, Alert, Snackbar } from '@mui/material';
import { LoginCredentials } from '../utils/auth.types';

export const LoginPageContainer = () => {
  const { mutate: login, isError, error, isPending, reset } = useLogin();

  const handleSubmit = async (credentials: LoginCredentials) => {
    login(credentials);
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoginForm onSubmit={handleSubmit} isLoading={isPending} />
      
      <Snackbar 
        open={isError} 
        autoHideDuration={6000} 
        onClose={() => reset()}
      >
        <Alert severity="error" onClose={() => reset()}>
          {error?.message || 'An error occurred during login'}
        </Alert>
      </Snackbar>
    </Container>
  );
}; 