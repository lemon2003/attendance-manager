import { ClientLayout } from '../layout-client'

export default async function RootLayout({
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
