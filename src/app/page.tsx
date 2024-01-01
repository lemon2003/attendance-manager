'use client'

import { Link } from '@chakra-ui/next-js'
import { Button, Container, Flex, Heading, VStack } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <Container h='100%'>
      <VStack justify='space-around' h='100%'>
        <Heading>Home Page</Heading>
        <Button as={Link} href='/'>
          Start
        </Button>
      </VStack>
    </Container>
  )
}
