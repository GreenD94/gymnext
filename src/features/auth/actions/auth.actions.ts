'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

interface LoginCredentials {
  phoneNumber: string;
  cedula: string;
}

export async function loginUser(credentials: LoginCredentials) {
  const supabase = createServerActionClient({ cookies });
  
  try {
    // First, query the user table to find the user with matching credentials
    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('id, role')
      .eq('phone_number', credentials.phoneNumber)
      .eq('cedula', credentials.cedula)
      .single();

    if (queryError || !user) {
      throw new Error('Invalid credentials');
    }

    // Create a custom token for the user
    const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
      email: `${credentials.phoneNumber}@temp.com`, // We use phone number as email since Supabase requires email
      password: credentials.cedula, // We use cedula as password
    });

    if (signInError) {
      throw signInError;
    }

    return {
      user: {
        id: user.id,
        role: user.role,
      },
      session,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Authentication failed');
  }
} 