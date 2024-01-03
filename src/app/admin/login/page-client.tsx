'use client'

import { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Container,
  Input,
  VStack,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { supabase } from '@/client/supabase'

export default function LoginPageClient() {
  const toast = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
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

    router.replace('/admin')
  }

  return (
    <chakra.form display='contents' onSubmit={handleSignIn}>
      <Container h='100%'>
        <VStack justify='center' gap='5' h='100%'>
          <Input
            type='text'
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
          <Button type='submit'>Sign in</Button>
        </VStack>
      </Container>
    </chakra.form>
  )
}
