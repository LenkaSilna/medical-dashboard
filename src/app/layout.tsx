import './styles/globals.css'
import ThemeProvider from '@/app/context/ThemeContext'
import { CustomApolloProvider } from '@/app/context/ApolloContext'
import ClientLayout from '@/app/components/ClientLayout'

export const metadata = {
  title: 'Medical Dashboard',
  description: 'App for displaying patient medical data',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CustomApolloProvider>
            <ClientLayout>{children}</ClientLayout>
          </CustomApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
