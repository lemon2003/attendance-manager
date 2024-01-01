import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { UsersWithStateColumns } from '@/schema/database'
import { createServerClient } from '@/server/supabase'
import ListViewPageClient from './page-client'

export default async function ListViewPage() {
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

  return <ListViewPageClient initialData={initialData} />
}
