'use client'

import Header from '@/app/shared/Header'

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
