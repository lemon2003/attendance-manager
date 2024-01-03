import { Metadata } from 'next'
import AdminPageClient from './page-client'

export const metadata: Metadata = {
  title: 'ダッシュボード',
}

export default function AdminPage() {
  return <AdminPageClient />
}
