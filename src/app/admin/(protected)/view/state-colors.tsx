import { ColorProps } from '@chakra-ui/react'
import { UsersWithStateColumns } from '@/schema/database'

export const stateColors: Record<
  UsersWithStateColumns['state'],
  ColorProps['color']
> = {
  attended: 'green.400',
  absent: 'gray.400',
  unspecified: 'orange.400',
}
