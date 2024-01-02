import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import { createServerClient } from '@/server/supabase'
import { ProtectedLayoutClient } from './layout-client'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookiesStore = cookies()
  const supabase = createServerClient(cookiesStore)
  const session = await supabase.auth.getSession()
  if (!session.data.session) {
    redirect('/admin/login', RedirectType.replace)
  }

  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>
}
