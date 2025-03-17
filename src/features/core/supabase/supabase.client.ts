import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => {
  if (typeof window === 'undefined') {
    // Server-side
    const cookieStore = cookies()
    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // Handle cookies in middleware
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // Handle cookies in middleware
            }
          },
        },
      }
    )
  }
  // Client-side
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Create a single instance for client-side
export const supabase = typeof window !== 'undefined' ? createClient() : undefined 