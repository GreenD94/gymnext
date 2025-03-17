import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/features/core/supabase/supabase.client'

export async function getSession() {
  const supabase = createClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function signOut() {
  const supabase = createClient()
  try {
    await supabase.auth.signOut()
    redirect('/login')
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
} 