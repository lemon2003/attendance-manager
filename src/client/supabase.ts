import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/schema/supabase'

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
)
