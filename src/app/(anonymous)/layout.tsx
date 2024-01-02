import { ClientLayout } from '../layout-client'

export const metadata = {
  title: '同窓会 出席確認',
  description: '滋賀県立守山高等学校第57期生20歳の集い同窓会の出席確認フォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
