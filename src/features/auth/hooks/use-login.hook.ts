import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../actions/auth.actions';
import { AuthError, LoginCredentials, AuthUser } from '../utils/auth.types';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();

  return useMutation<AuthUser, AuthError, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // Redirect based on user role
      router.push('/dashboard');
    },
  });
}; 