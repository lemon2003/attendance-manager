import type { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/schema/supabase'

const create = (cookieStore: ReturnType<typeof cookies>) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

export { create as createServerClient }
