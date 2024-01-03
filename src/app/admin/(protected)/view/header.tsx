'use client'

import React from 'react'
import { Grid, GridItem, HStack, Icon, VStack, Text } from '@chakra-ui/react'
import { IconCheck, IconX, IconQuestionMark } from '@tabler/icons-react'
import { stateColors } from './state-colors'

interface HorizontalHeaderProps {
  aggregation: {
    attended: number
    absent: number
    unspecified: number
  }[]
}

export const HorizontalHeader = React.memo(function HorizontalHeader({
  aggregation,
}: HorizontalHeaderProps) {
  return (
    <Grid
      templateColumns='subgrid'
      column='span 8'
      pos='sticky'
      top='0'
      zIndex='sticky'
      bg='white'
      boxShadow='2xl'
      ml='calc(-1 * var(--chakra-space-1))'
      mb='2'
    >
      {[...Array(8)].map((_, index) => (
        <GridItem key={index}>
          <VStack gap='0'>
            <Text>{`${index} 組`}</Text>
            <HStack>
              <HStack gap='1px'>
                <Icon as={IconCheck} color={stateColors.attended} />
                <Text>{aggregation[index].attended}</Text>
              </HStack>
              <HStack gap='1px'>
                <Icon as={IconX} color={stateColors.absent} />
                <Text>{aggregation[index].absent}</Text>
              </HStack>
              <HStack gap='1px'>
                <Icon as={IconQuestionMark} color={stateColors.unspecified} />
                <Text>{aggregation[index].unspecified}</Text>
              </HStack>
            </HStack>
          </VStack>
        </GridItem>
      ))}
    </Grid>
  )
})
