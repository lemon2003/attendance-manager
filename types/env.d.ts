declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_SUPABASE_URL: string
        NEXT_PUBLIC_SUPABASE_KEY: string
        SUPABASE_SECRET_KEY: string
      }
    }
  }
}
