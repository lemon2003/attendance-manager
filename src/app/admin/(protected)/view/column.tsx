'use client'

import React from 'react'
import { Grid, GridProps } from '@chakra-ui/react'
import { UsersWithStateColumns } from '@/schema/database'
import { Cell } from './cell'

interface ColumnProps extends GridProps {
  columnData?: (UsersWithStateColumns | null)[]
  rowCount?: number
}

export const Column = React.memo(function Column({
  columnData,
  children,
  rowCount,
  ...rest
}: ColumnProps) {
  const _rowCount = rowCount ?? columnData?.length

  return (
    <Grid
      templateColumns='repeat(3, max-content)'
      templateRows='subgrid'
      row={`span ${_rowCount}`}
      {...rest}
    >
      {children ??
        columnData?.map((cellData, cellIndex) => (
          <Cell key={cellIndex} cellIndex={cellIndex} cellData={cellData} />
        ))}
    </Grid>
  )
})
