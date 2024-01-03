'use client'

import React from 'react'
import { Grid, GridItem, GridProps } from '@chakra-ui/react'
import { UsersWithStateColumns } from '@/schema/database'
import { RemarksIcon } from './remarks-icon'
import { StateButton } from './state-button'

interface CellProps extends GridProps {
  cellIndex: number
  cellData?: UsersWithStateColumns | null
}

export const Cell = React.memo(function Cell({
  cellIndex,
  cellData,
  children,
  ...rest
}: CellProps) {
  return (
    <Grid
      templateColumns='subgrid'
      column='span 3'
      columnGap='1'
      alignItems='center'
      px='2'
      bg={
        cellIndex != undefined && (cellIndex % 10) - 5 < 0
          ? 'gray.200'
          : 'white'
      }
      {...rest}
    >
      {children ??
        (cellData && (
          <>
            <GridItem
              {...(cellData.state === 'absent' ? { color: 'gray.500' } : {})}
            >
              {cellData.full_name}
            </GridItem>
            <RemarksIcon label={cellData.remarks} />
            <StateButton
              state={cellData.state}
              aria-label=''
              class={cellData.class!}
              number={cellData.number!}
            />
          </>
        ))}
    </Grid>
  )
})
