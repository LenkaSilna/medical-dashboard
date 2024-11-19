'use client'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { useState } from 'react'

interface CustomApolloProviderProps {
  children: React.ReactNode
}

export function CustomApolloProvider({ children }: CustomApolloProviderProps) {
  const [client] = useState<ApolloClient<NormalizedCacheObject>>(
    () =>
      new ApolloClient({
        uri: '/api/graphql',
        cache: new InMemoryCache(),
      })
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
