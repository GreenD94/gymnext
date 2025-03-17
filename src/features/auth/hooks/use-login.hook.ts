import { useMutation } from '@tanstack/react-query';
import { login } from '../actions/login.client';
import { AuthError, LoginCredentials, AuthUser } from '../utils/auth.types';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<AuthUser, AuthError, LoginCredentials>({
    mutationFn: login,
    onSuccess: (user) => {
      // Redirect based on user role
      switch (user.role) {
        case 'super_admin':
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'trainer':
          router.push('/trainer/dashboard');
          break;
        case 'client':
        default:
          router.push('/dashboard');
          break;
      }
      router.refresh(); // Refresh the current route to update server components
    },
    onError: (error) => {
      // Log error for monitoring but don't expose internal details to user
      console.error('Login error:', error);
    },
  });
}; 