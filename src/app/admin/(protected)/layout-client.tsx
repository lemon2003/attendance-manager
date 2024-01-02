'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Container, Flex, HStack, Heading } from '@chakra-ui/react'
import { createBrowserClient } from '@supabase/ssr'

export function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
  )

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }
  return (
    <Flex w='100%' h='100%' direction='column'>
      <Box
        borderBottomWidth='1px'
        borderBottomColor='gray.200'
        top='0'
        bg='white'
        flex='0'
      >
        <Container maxW='container.xl'>
          <HStack justify='space-between' py='1'>
            <Heading size='md'>Admin Page</Heading>
            <HStack>
              <Button size='sm' variant='ghost' onClick={handleSignOut}>
                {'Sign out'}
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>
      {children}
    </Flex>
  )
}
