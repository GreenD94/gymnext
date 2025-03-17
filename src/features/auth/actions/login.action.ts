import { createClient } from '@/features/core/supabase/supabase.client'
import { redirect } from 'next/navigation'

export type LoginCredentials = {
  phone: string
  identityNumber: string
}

export async function loginAction(credentials: LoginCredentials) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone: credentials.phone,
      password: credentials.identityNumber,
    })

    if (error) {
      return { error: error.message }
    }

    if (!data?.session) {
      return { error: 'No session created' }
    }

    // Redirect based on user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.session.user.id)
      .single()

    if (profile?.role === 'admin') {
      redirect('/admin')
    } else if (profile?.role === 'trainer') {
      redirect('/trainer')
    } else {
      redirect('/dashboard')
    }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'An unexpected error occurred' }
  }
} 