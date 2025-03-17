'use server';

import { createServerSupabaseClient } from '@/features/core/supabase/supabase.server';
import { AuthError, AuthErrorCode, LoginCredentials, AuthUser } from '../utils/auth.types';

function formatPhoneToEmail(phone: string): string {
  // Remove any non-digit characters and append @user.com
  return `${phone.replace(/\D/g, '')}@user.com`;
}

async function createSession(credentials: LoginCredentials): Promise<void> {
  const supabase = createServerSupabaseClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: formatPhoneToEmail(credentials.phoneNumber),
    password: credentials.cedula,
  });

  if (signInError) {
    console.error('Session creation error:', signInError);
    throw new AuthError(
      'Invalid phone number or cédula.',
      AuthErrorCode.INVALID_CREDENTIALS
    );
  }
}

async function getUserDetails(): Promise<AuthUser> {
  const supabase = createServerSupabaseClient();
  
  // Get the authenticated user's ID
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new AuthError(
      'Failed to get user details.',
      AuthErrorCode.SYSTEM_ERROR
    );
  }

  // Get user profile details
  const { data: profile, error: queryError } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', user.id)
    .single();

  if (queryError || !profile) {
    console.error('Database query error:', queryError);
    throw new AuthError(
      'An error occurred while getting user details. Please contact support.',
      AuthErrorCode.SUPPORT_REQUIRED
    );
  }

  return profile;
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    // First authenticate with Supabase
    await createSession(credentials);
    
    // Then get the user details
    const user = await getUserDetails();
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