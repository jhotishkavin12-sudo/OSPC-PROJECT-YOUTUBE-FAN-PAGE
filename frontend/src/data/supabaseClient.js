import { createClient } from '@supabase/supabase-js';

// Supabase credentials (can be set via .env or Vercel/Netlify environment variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-a2d-hub.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key-placeholder';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
