'use client'

import React, { useState } from 'react'
import {
  Checkbox,
  Divider,
  Flex,
  IconButton,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { IconListCheck, IconPlaylistX } from '@tabler/icons-react'
import { FilterProps } from './types'

export function StateFilter({
  id,
  columnFilters,
  setColumnFilters,
}: FilterProps) {
  const [multiple, setMultiple] = useState(false)

  const filter = columnFilters.find((filter) => filter.id === id)
  const filterValue = (filter?.value ?? []) as string[]

  const handleToggleMultiple = () => {
    setMultiple(!multiple)
  }

  const handleResetFilter = () => {
    setColumnFilters((columnFilters) => {
      const index = columnFilters.findIndex((filter) => filter.id === id)
      if (index !== -1) {
        columnFilters = columnFilters.toSpliced(index, 1)
      }
      return columnFilters
    })
  }

  const handleChangeFilter: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const targetValue = e.target.value
    setColumnFilters((columnFilters) => {
      const index = columnFilters.findIndex((filter) => filter.id === id)
      const object = columnFilters[index]
      let value = (object?.value ?? []) as string[]

      const i = value.indexOf(targetValue)
      if (i !== -1) {
        value = value.toSpliced(i, 1)
      } else {
        if (multiple) {
          value = [...value, targetValue]
        } else {
          value = [targetValue]
        }
      }

      if (index !== -1) {
        columnFilters = columnFilters.toSpliced(index, 1)
      }

      if (value.length !== 0) {
        columnFilters = [
          ...columnFilters,
          {
            id,
            value,
          },
        ]
      }

      return columnFilters
    })
  }

  return (
    <>
      <Text>出席状況</Text>
      <Flex gap='3' align='center'>
        <IconButton
          aria-label='Toggle allow multiple'
          variant='outline'
          size='xs'
          icon={<IconListCheck />}
          colorScheme={multiple ? 'blue' : 'gray'}
          onClick={handleToggleMultiple}
        />
        <IconButton
          aria-label='Turn off filter'
          variant='outline'
          size='xs'
          icon={<IconPlaylistX />}
          onClick={handleResetFilter}
        />
        <Divider orientation='vertical' />
        <Wrap gap='4'>
          {[
            ['attended', '出席済み'],
            ['absent', '欠席'],
            ['unspecified', '未指定'],
          ].map(([value, display]) => (
            <Checkbox
              key={value}
              value={value}
              isChecked={filterValue.includes(value)}
              onChange={handleChangeFilter}
            >
              {display}
            </Checkbox>
          ))}
        </Wrap>
      </Flex>
    </>
  )
}
