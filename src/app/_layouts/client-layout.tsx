'use client'

import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/client/react-query'

const theme = extendTheme(
  {
    styles: {
      global: {
        'html, body': {
          w: '100%',
          h: '100%',
          boxSizing: 'border-box',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'blue',
  }),
)

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  )
}
