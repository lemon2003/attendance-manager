'use client'

import React, { useMemo } from 'react'
import { Grid, GridItem, GridProps } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { UsersWithStateColumns } from '@/schema/database'

export const databaseQueryKey = 'database'

interface ColumnProps extends GridProps {
  cellCount?: number
  rowCount: number
}

interface RowProps extends GridProps {
  cellCount?: number
  index?: number
}

function Column({ cellCount, rowCount, children, ...rest }: ColumnProps) {
  return (
    <Grid
      templateColumns={`repeat(${cellCount ?? 1}, minmax(max-content, 100%))`}
      templateRows='subgrid'
      alignSelf='stretch'
      gridRow={`span ${rowCount}`}
      left='0'
      {...rest}
    >
      {children}
    </Grid>
  )
}

function Row({ cellCount, index, children, ...rest }: RowProps) {
  return (
    <Grid
      templateColumns='subgrid'
      alignContent='start'
      autoFlow='column'
      column={`span ${cellCount ?? 1}`}
      borderRight='2px solid white'
      px='2'
      columnGap='1'
      bg={index != undefined && (index % 10) - 5 < 0 ? 'gray.200' : 'white'}
      {...rest}
    >
      {children}
    </Grid>
  )
}

interface ListViewPageClientProps {
  initialData: UsersWithStateColumns[][]
}

export default function ListViewPageClient({
  initialData,
}: ListViewPageClientProps) {
  const { data } = useQuery({
    queryKey: [databaseQueryKey],
    initialData,
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const rowCount = useMemo(
    () => data?.reduce((acc, cur) => Math.max(acc, cur.length), 0) || 0,
    [data],
  )
  const filledData = useMemo(
    () =>
      data?.map((column) => {
        const fill = [...Array(rowCount - column.length)].fill(null) as null[]
        return [...column, ...fill]
      }) ?? [],
    [data, rowCount],
  )

  return (
    <Grid
      templateColumns='auto repeat(8, 160px)'
      templateRows={`auto repeat(${rowCount}, 1fr)`}
      justifyContent='stretch'
      autoFlow='row'
      mx='auto'
      fontSize='small'
      pos='relative'
      maxW='100%'
      overflowY='auto'
    >
      <Row pos='sticky' top='0' left='0' />
      {[...Array(8)].map((_value, index) => (
        <Row key={index} textAlign='center'>
          {`${index} 組`}
        </Row>
      ))}
      <Column rowCount={rowCount}>
        {[...Array(rowCount)].map((_value, index) => (
          <Row key={index} index={index} textAlign='right'>
            {index + 1}
          </Row>
        ))}
      </Column>
      {filledData?.map((users, index) => (
        <Column key={index} rowCount={rowCount} cellCount={3}>
          {users.map((user, index) => (
            <Row key={index} index={index} cellCount={3}>
              {user && (
                <>
                  <GridItem>{user.full_name}</GridItem>
                  <GridItem>{user.state}</GridItem>
                  <GridItem>{''}</GridItem>
                </>
              )}
            </Row>
          ))}
        </Column>
      ))}
    </Grid>
  )
}
