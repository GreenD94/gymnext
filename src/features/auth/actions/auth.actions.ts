'use server';

import { createClient } from '@/features/core/supabase/supabase.client';
import { AuthError, AuthErrorCode, LoginCredentials, AuthUser } from '../utils/auth.types';

export class AuthService {
  private supabase = createClient();

  async findUserByCredentials(credentials: LoginCredentials): Promise<AuthUser> {
    const { data: user, error: queryError } = await this.supabase
      .from('users')
      .select('id, role')
      .eq('phone_number', credentials.phoneNumber)
      .eq('cedula', credentials.cedula)
      .single();

    if (queryError) {
      console.error('Database query error:', queryError);
      throw new AuthError(
        'An error occurred while verifying credentials. Please contact support.',
        AuthErrorCode.SUPPORT_REQUIRED
      );
    }

    if (!user) {
      throw new AuthError(
        'Invalid phone number or cédula.',
        AuthErrorCode.INVALID_CREDENTIALS
      );
    }

    return user;
  }

  async createSession(credentials: LoginCredentials): Promise<void> {
    const { error: signInError } = await this.supabase.auth.signInWithPassword({
      email: `${credentials.phoneNumber}@temp.com`,
      password: credentials.cedula,
    });

    if (signInError) {
      console.error('Session creation error:', signInError);
      throw new AuthError(
        'Failed to create session. Please try again.',
        AuthErrorCode.SYSTEM_ERROR
      );
    }
  }
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    const authService = new AuthService();
    const user = await authService.findUserByCredentials(credentials);
    await authService.createSession(credentials);
    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error('Unexpected error during login:', error);
    throw new AuthError(
      'An unexpected error occurred. Please try again later.',
      AuthErrorCode.SUPPORT_REQUIRED
    );
  }
} 