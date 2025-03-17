'use server';

import { createClient } from '@/features/core/supabase/supabase.client';
import { AuthError, AuthErrorCode, LoginCredentials, AuthUser } from '../utils/auth.types';

function formatPhoneToEmail(phone: string): string {
  // Remove any non-digit characters and append @user.com
  return `${phone.replace(/\D/g, '')}@user.com`;
}

async function findUserByCredentials(credentials: LoginCredentials): Promise<AuthUser> {
  const supabase = createClient();
  const { data: user, error: queryError } = await supabase
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

async function createSession(credentials: LoginCredentials): Promise<void> {
  const supabase = createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: formatPhoneToEmail(credentials.phoneNumber),
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

export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    const user = await findUserByCredentials(credentials);
    await createSession(credentials);
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