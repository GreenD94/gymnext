'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/auth/components/login-form.component';
import { loginUser } from '@/features/auth/actions/auth.actions';
import { Container, Alert, Snackbar } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { phoneNumber: string; cedula: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await loginUser(data);
      
      // Redirect based on user role (this will be handled by middleware)
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
} 