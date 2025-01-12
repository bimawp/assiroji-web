import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

export const prisma = new PrismaClient();

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function verifyToken(token) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return false;
  }
  return true;
}
export const bucket = 'artikel-bucket';
