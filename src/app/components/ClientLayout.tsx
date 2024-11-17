'use client'

import Header from './Header'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  )
}
