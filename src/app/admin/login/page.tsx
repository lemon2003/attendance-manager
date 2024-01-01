'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, Input, VStack, useToast } from '@chakra-ui/react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const toast = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
  )

  const handleSignIn = async () => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (response.error) {
      toast({
        status: 'error',
        title: response.error?.name,
        description: response.error?.message,
        isClosable: true,
      })
    }

    router.replace('/admin/view')
  }

  return (
    <Container h='100%'>
      <VStack justify='center' gap='5' h='100%'>
        <Input
          type='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={handleSignIn}>Sign in</Button>
      </VStack>
    </Container>
  )
}