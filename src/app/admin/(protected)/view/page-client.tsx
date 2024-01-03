'use client'

import React, { useMemo, useState } from 'react'
import { Box, Grid, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/client/supabase'
import { UsersWithStateColumns } from '@/schema/database'
import { Cell } from './cell'
import { Column } from './column'
import { HorizontalHeader } from './header'
import { ModifyStateModal } from './modify-state-modal'
import { TopLeftCell } from './top-left-cell'
import { useSubscribe } from './use-subscribe'

export const databaseQueryKey = 'database'

interface ListViewPageClientProps {
  initialData: UsersWithStateColumns[][]
}

export default function ViewPageClient({
  initialData,
}: ListViewPageClientProps) {
  useSubscribe()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fontSize, setFontSize] = useState(13)

  const { data } = useQuery({
    queryKey: [databaseQueryKey],
    queryFn: async () => {
      const response = await supabase
        .from('users_with_state')
        .select('*')
        .order('class')
        .order('number')

      return response.data!.reduce(
        (acc, cur) => {
          acc[cur.class!].push(cur)
          return acc
        },
        [[], [], [], [], [], [], [], []] as UsersWithStateColumns[][],
      )
    },
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

  const aggregation = useMemo(
    () =>
      data.map((column) =>
        column.reduce(
          (acc, cur) => {
            acc[cur.state]++
            return acc
          },
          {
            attended: 0,
            absent: 0,
            unspecified: 0,
          },
        ),
      ),
    [data],
  )

  return (
    <>
      <Box flex='1' w='100%' overflow='hidden'>
        <Grid
          templateColumns='auto repeat(8, 1fr)'
          templateRows={`auto repeat(${rowCount}, 1fr)`}
          autoFlow='row'
          mx='auto'
          fontSize={`${fontSize}px`}
          pos='relative'
          maxW='100%'
          maxH='100%'
          minH='0'
          w='max-content'
          overflow='auto'
          columnGap='1'
          px='3'
          bg='white'
        >
          <TopLeftCell onOpen={onOpen} />
          <HorizontalHeader aggregation={aggregation} />
          <Column
            rowCount={rowCount}
            templateColumns='auto'
            zIndex='sticky'
            boxShadow='2xl'
            pos='sticky'
            left='0'
          >
            {[...Array(rowCount)].map((_, cellIndex) => (
              <Cell key={cellIndex} cellIndex={cellIndex} textAlign='right'>
                {cellIndex + 1}
              </Cell>
            ))}
          </Column>
          {filledData.map((columnData, index) => (
            <Column key={index} columnData={columnData} />
          ))}
        </Grid>
      </Box>
      <ModifyStateModal
        isOpen={isOpen}
        onClose={onClose}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
    </>
  )
}
