import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const SUPABASE_URL: string = process.env['DB_URL']!;
const SUPABASE_KEY: string = process.env['DB_KEY']!;