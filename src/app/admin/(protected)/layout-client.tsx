'use client'

import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from '@chakra-ui/react'
import { supabase } from '@/client/supabase'

export function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
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
