'use client'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useState } from 'react'

export function CustomApolloProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [client] = useState(
    () =>
      new ApolloClient({
        uri: '/api/graphql',
        cache: new InMemoryCache(),
      })
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
