import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      storageKey: 'reviewdle-auth',
      storage: window.localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)