import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://cnvaqtbcdssgdlyjhdyf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudmFxdGJjZHNzZ2RseWpoZHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTIyMTcsImV4cCI6MjA0OTc2ODIxN30.Wpse3elnzRp9tACkMlm9umJECxeXFokLqIM6RglrTcg";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
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