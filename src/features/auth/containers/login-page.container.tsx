'use client';

import { LoginForm } from '../components/login-form.component';
import { useLogin } from '../hooks/use-login.hook';
import { Container, Alert, Snackbar } from '@mui/material';

export const LoginPageContainer = () => {
  const { mutate: login, isError, error, isPending, reset } = useLogin();

  return (
    <Container component="main" maxWidth="xs">
      <LoginForm onSubmit={login} isLoading={isPending} />
      
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