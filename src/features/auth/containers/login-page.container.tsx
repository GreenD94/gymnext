'use client';

import { LoginForm } from '../components/login-form.component';
import { useLogin } from '../hooks/use-login.hook';
import { Box, Container, Alert, Snackbar, Paper, Typography } from '@mui/material';
import { LoginCredentials } from '../utils/auth.types';
import { TopBar } from '@/features/core/components/top-bar.component';
import { useTranslations } from 'next-intl';

export const LoginPageContainer = () => {
  const { mutate: login, isError, error, isPending, reset } = useLogin();
  const t = useTranslations('auth.login');

  const handleSubmit = async (credentials: LoginCredentials) => {
    login(credentials);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{ 
          mt: '64px', // Height of AppBar
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 4,
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {t('title')}
          </Typography>
          <LoginForm onSubmit={handleSubmit} isLoading={isPending} />
        </Paper>
      
        <Snackbar 
          open={isError} 
          autoHideDuration={6000} 
          onClose={() => reset()}
        >
          <Alert severity="error" onClose={() => reset()}>
            {error?.message || t('errors.generic')}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}; 