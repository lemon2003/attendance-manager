'use client'

import { Link } from '@chakra-ui/next-js'
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  VStack,
} from '@chakra-ui/react'

export default function AdminPageClient() {
  return (
    <Container maxW='container.xl' py='10' flex='1'>
      <VStack alignItems='stretch'>
        <Card>
          <CardHeader>
            <Heading size='md'>{'出席状況確認'}</Heading>
          </CardHeader>
          <CardBody color='blue.400'>
            <Link href='/admin/view'>{'出席状況確認'}</Link>
          </CardBody>
        </Card>
        <Card></Card>
      </VStack>
    </Container>
  )
}
