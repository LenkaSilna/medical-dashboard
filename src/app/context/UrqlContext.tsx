'use client'

import { Provider } from 'urql'
import { Client, cacheExchange, fetchExchange } from '@urql/core'
import { useState } from 'react'

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new Client({
        url: '/api/graphql',
        exchanges: [cacheExchange, fetchExchange],
      })
  )

  return <Provider value={client}>{children}</Provider>
}
