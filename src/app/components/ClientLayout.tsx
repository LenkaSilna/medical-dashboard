'use client'

import Header from './Header'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  )
}
