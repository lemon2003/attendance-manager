'use client'

import React from 'react'
import { Tooltip, Icon, IconProps, Box } from '@chakra-ui/react'
import { IconInfoCircle } from '@tabler/icons-react'

interface RemarksIconProps extends IconProps {
  label?: string | null
}

export const RemarksIcon = React.memo(function RemarksIcon({
  label,
  ...rest
}: RemarksIconProps) {
  return label ? (
    <Tooltip label={label}>
      <Icon as={IconInfoCircle} color='blue.500' {...rest} />
    </Tooltip>
  ) : (
    <Box />
  )
})
