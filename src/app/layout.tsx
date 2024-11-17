import './styles/globals.css'
import ThemeProvider from '@/app/context/ThemeContext'
import { UrqlProvider } from '@/app/context/UrqlContext'
import ClientLayout from '@/app/components/ClientLayout'

export const metadata = {
  title: 'Medical Dashboard',
  description: 'App for displaying patient medical data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <UrqlProvider>
            <ClientLayout>{children}</ClientLayout>
          </UrqlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
