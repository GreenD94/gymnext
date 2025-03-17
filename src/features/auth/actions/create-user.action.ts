'use server';

import { createServerSupabaseClient } from '@/features/core/supabase/supabase.server';
import { LoginCredentials } from '../utils/auth.types';

export async function createUser(credentials: LoginCredentials) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Format phone number as email
    const email = `${credentials.phoneNumber.replace(/\D/g, '')}@user.com`;
    
    // Create the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: credentials.cedula,
      options: {
        data: {
          phone: credentials.phoneNumber,
        }
      }
    });

    if (signUpError) throw signUpError;

    return { success: true, data };
    
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user'
    };
  }
} 