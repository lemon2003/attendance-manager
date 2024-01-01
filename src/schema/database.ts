import type { Database } from './supabase'

export type UsersColumns = Database['public']['Tables']['users']['Row']
export type UserStatesColumns = Database['public']['Tables']['users']['Row']
export type UsersWithStateColumns =
  Database['public']['Views']['users_with_state']['Row']
