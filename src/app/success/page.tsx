'use client'

import { Link } from '@chakra-ui/next-js'
import { Text, VStack } from '@chakra-ui/react'

export default function SuccessPage() {
  return (
    <VStack gap='10' justify='space-evenly' w='100%' py='20'>
      <Text>{'出席が確認されました。この画面は閉じても問題ありません。'}</Text>
      <Link href='/' color='blue.400'>
        はじめのページへ戻る
      </Link>
    </VStack>
  )
}
