import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const createClient = () => {
  if (typeof window === 'undefined') {
    // Server-side - cookie operations are handled in middleware
    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return undefined // Cookie operations should be handled in middleware
          },
          set(name: string, value: string, options: CookieOptions) {
            return // Cookie operations should be handled in middleware
          },
          remove(name: string, options: CookieOptions) {
            return // Cookie operations should be handled in middleware
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