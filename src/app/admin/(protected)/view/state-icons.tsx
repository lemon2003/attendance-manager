import { IconCheck, IconX, IconQuestionMark } from '@tabler/icons-react'
import { UsersWithStateColumns } from '@/schema/database'

export const stateIcons: Record<
  UsersWithStateColumns['state'],
  React.ComponentType
> = {
  attended: IconCheck,
  absent: IconX,
  unspecified: IconQuestionMark,
}
