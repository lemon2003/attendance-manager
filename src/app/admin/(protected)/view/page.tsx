import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { UsersWithStateColumns } from '@/schema/database'
import { createServerClient } from '@/server/supabase'
import ViewPageClient from './page-client'

export const metadata: Metadata = {
  title: '出席状況確認',
}

export default async function ViewPage() {
  const cookiesStore = cookies()
  const supabase = createServerClient(cookiesStore)

  const response = await supabase
    .from('users_with_state')
    .select('*')
    .order('class')
    .order('number')

  if (response.error) {
    notFound()
  }

  const initialData = response.data.reduce(
    (acc, cur) => {
      acc[cur.class!].push(cur)
      return acc
    },
    [[], [], [], [], [], [], [], []] as UsersWithStateColumns[][],
  )

  return <ViewPageClient initialData={initialData} />
}
