'use server';

import { createServerSupabaseClient } from '@/features/core/supabase/supabase.server';
import { LoginCredentials } from '../utils/auth.types';

export async function createUser(credentials: LoginCredentials) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Format phone number as email
    const email = `${credentials.phoneNumber.replace(/\D/g, '')}@user.com`;
    
    // Create the user auth record
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: credentials.cedula,
      options: {
        data: {
          phone: credentials.phoneNumber,
        }
      }
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error('Failed to create user');

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          phone: credentials.phoneNumber,
          role: 'client', // Default role
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return { success: true, data: authData };
    
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user'
    };
  }
} 