'use client'

import React from 'react'
import { Grid, IconButton } from '@chakra-ui/react'
import { IconSettings } from '@tabler/icons-react'

interface TopLeftCellProps {
  onOpen: () => void
}

export const TopLeftCell = React.memo(function TopLeftCell({
  onOpen,
}: TopLeftCellProps) {
  return (
    <Grid
      justifyItems='center'
      alignItems='center'
      pos='sticky'
      top='0'
      left='0'
      zIndex='calc(var(--chakra-zIndices-sticky) + 1)'
      bg='white'
    >
      <IconButton
        icon={<IconSettings />}
        variant='ghost'
        size='xs'
        color='gray.300'
        onClick={onOpen}
        aria-label={''}
      />
    </Grid>
  )
})
