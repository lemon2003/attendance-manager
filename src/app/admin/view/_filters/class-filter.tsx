'use client'

import React, { useState } from 'react'
import {
  IconButton,
  Checkbox,
  Divider,
  Flex,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { IconListCheck, IconPlaylistX } from '@tabler/icons-react'
import { FilterProps } from './types'

export function ClassFilter({
  id,
  columnFilters,
  setColumnFilters,
}: FilterProps) {
  const [multiple, setMultiple] = useState(false)

  const filter = columnFilters.find((filter) => filter.id === id)
  const filterValue = (filter?.value ?? []) as number[]

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
    const targetValue = Number(e.target.value)
    setColumnFilters((columnFilters) => {
      const index = columnFilters.findIndex((filter) => filter.id === id)
      const object = columnFilters[index]
      let value = (object?.value ?? []) as number[]

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
      <Text>組</Text>
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
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <Checkbox
              key={n}
              value={`${n}`}
              isChecked={filterValue.includes(n)}
              onChange={handleChangeFilter}
            >
              {`${n}`}
            </Checkbox>
          ))}
        </Wrap>
      </Flex>
    </>
  )
}
