import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _supabase: SupabaseClient | null = null;

export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy during build when env vars aren't set
    return null as unknown as SupabaseClient;
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
})();

export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseAnonKey;

export const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  if (!isSupabaseConfigured()) return '/placeholder.svg';
  const { data } = supabase.storage.from('products').getPublicUrl(path);
  return data.publicUrl;
};
