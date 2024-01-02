'use client'

import React, { useState } from 'react'
import {
  Flex,
  Text,
  Input,
  IconButton,
  chakra,
  Divider,
} from '@chakra-ui/react'
import { IconSearch, IconSearchOff } from '@tabler/icons-react'
import { FilterProps } from './types'

export function NameFilter({ id, setColumnFilters }: FilterProps) {
  const [input, setInput] = useState('')

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value)
  }

  const handleSubmitButton: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setColumnFilters((columnFilters) => {
      const index = columnFilters.findIndex((value) => value.id === id)
      if (index !== -1) {
        columnFilters = columnFilters.toSpliced(index, 1)
      }

      if (input.length !== 0) {
        columnFilters = [
          ...columnFilters,
          {
            id,
            value: input,
          },
        ]
      }

      return columnFilters
    })
    return false
  }

  const handleResetButton: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setInput('')
    setColumnFilters((columnFilters) => {
      const index = columnFilters.findIndex((value) => value.id === id)
      if (index !== -1) {
        columnFilters = columnFilters.toSpliced(index, 1)
      }

      return columnFilters
    })
    return false
  }

  return (
    <>
      <Text>名前</Text>
      <chakra.form
        display='contents'
        onSubmit={handleSubmitButton}
        onReset={handleResetButton}
      >
        <Flex gap='3' align='center'>
          <IconButton
            aria-label='Search'
            variant='outline'
            size='xs'
            icon={<IconSearch />}
            flexShrink='0'
          />
          <IconButton
            aria-label='Reset'
            variant='outline'
            size='xs'
            icon={<IconSearchOff />}
            flexShrink='0'
          />
          <Divider orientation='vertical' alignSelf='stretch' />
          <Input
            size='sm'
            placeholder='Input ...'
            value={input}
            onChange={handleChangeInput}
            minW='0'
          />
        </Flex>
      </chakra.form>
    </>
  )
}
