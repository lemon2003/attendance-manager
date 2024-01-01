import { ClientLayout } from './_layouts/client-layout'
import { ServerLayout } from './_layouts/server-layout'

export const metadata = {
  title: 'Home page',
  description: 'Home page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body>
        <ServerLayout>
          <ClientLayout>{children}</ClientLayout>
        </ServerLayout>
      </body>
    </html>
  )
}
