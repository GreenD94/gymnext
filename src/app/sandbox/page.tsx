'use client';

import { Box, Container, Typography, Paper, Divider, Alert } from '@mui/material';
import { CreateUserForm } from '@/features/auth/components/create-user-form.component';
import { LoginForm } from '@/features/auth/components/login-form.component';
import { useState } from 'react';
import { LoginCredentials } from '@/features/auth/utils/auth.types';
import { loginUser } from '@/features/auth/actions/auth.actions';

export default function SandboxPage() {
  const [lastCreatedUser, setLastCreatedUser] = useState<LoginCredentials | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleUserCreated = (credentials: LoginCredentials) => {
    setLastCreatedUser(credentials);
    setLoginError(null);
    setLoginSuccess(false);
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setLoginError(null);
      setLoginSuccess(false);
      
      const user = await loginUser(credentials);
      console.log('Login successful:', user);
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Auth Testing Sandbox
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Create User Form */}
        <Paper sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create User
          </Typography>
          <CreateUserForm onSuccess={handleUserCreated} />
        </Paper>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        
        {/* Login Form */}
        <Paper sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          {lastCreatedUser && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="success.contrastText">
                Last Created User:
              </Typography>
              <Typography variant="body2" color="success.contrastText">
                Phone: {lastCreatedUser.phoneNumber}
              </Typography>
              <Typography variant="body2" color="success.contrastText">
                Cedula: {lastCreatedUser.cedula}
              </Typography>
            </Box>
          )}
          {loginSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Login successful!
            </Alert>
          )}
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <LoginForm onSubmit={handleLogin} />
        </Paper>
      </Box>
    </Container>
  );
} 