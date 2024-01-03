'use client'

import { useState, useCallback, MouseEventHandler } from 'react'
import React from 'react'
import {
  IconButtonProps,
  useToast,
  useDisclosure,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  RadioGroup,
  VStack,
  Radio,
  HStack,
  PopoverFooter,
  Button,
  Text,
} from '@chakra-ui/react'
import { supabase } from '@/client/supabase'
import { UsersWithStateColumns } from '@/schema/database'
import { stateColors } from './state-colors'
import { stateIcons } from './state-icons'

interface StateButtonProps extends IconButtonProps {
  state: UsersWithStateColumns['state']
  class: number
  number: number
}

export const StateButton = React.memo(function StateButton({
  state,
  class: _class,
  number,
  ...rest
}: StateButtonProps) {
  const toast = useToast({
    size: 'sm',
    position: 'bottom-right',
    isClosable: true,
  })
  const [newState, setNewState] =
    useState<UsersWithStateColumns['state']>(state)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()

  const handleSubmit = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(async () => {
    setIsSubmitting(true)
    const response = await supabase.from('user_states').upsert({
      class: _class,
      number: number,
      state: newState,
    })
    setIsSubmitting(false)
    onClose()

    if (response.error) {
      toast({
        status: 'error',
        title: response.error.message,
        description: response.error.details,
      })
      return
    }

    toast({
      status: 'success',
      title: '更新に成功',
    })
  }, [_class, newState, number, onClose, toast])

  return (
    <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          icon={React.createElement(stateIcons[state], {})}
          variant='outline'
          color={stateColors[state]}
          w='0.75em'
          h='0.75em'
          borderRadius='0.25em'
          minW='0'
          overflow='hidden'
          {...rest}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <RadioGroup
            onChange={setNewState as (nextValue: string) => void}
            value={newState}
          >
            <VStack>
              <Radio value='attended'>
                <HStack>
                  <stateIcons.attended />
                  <Text>出席</Text>
                </HStack>
              </Radio>
              <Radio value='absent'>
                <HStack>
                  <stateIcons.absent />
                  <Text>欠席</Text>
                </HStack>
              </Radio>
              <Radio value='unspecified'>
                <HStack>
                  <stateIcons.unspecified />
                  <Text>未定</Text>
                </HStack>
              </Radio>
            </VStack>
          </RadioGroup>
        </PopoverBody>
        <PopoverFooter>
          <HStack justify='end'>
            <Button
              variant='outline'
              size='sm'
              isDisabled={isSubmitting}
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button size='sm' isLoading={isSubmitting} onClick={handleSubmit}>
              決定
            </Button>
          </HStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
})
