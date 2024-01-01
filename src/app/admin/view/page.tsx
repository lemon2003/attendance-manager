'use client'

import { useMemo, useState } from 'react'
import {
  Container,
  Flex,
  IconButton,
  Select,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnFiltersState,
  PaginationState,
  RowData,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { supabase } from '@/client/supabase'
import { UsersWithStateColumns } from '@/schema/database'
import { ClassFilter } from './_filters/class-filter'
import { NameFilter } from './_filters/name-filter'
import { StateFilter } from './_filters/state-filter'
import { useSubscribe } from './use-subscribe'

export const databaseQueryKey = 'database'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterFn?: 'in' | 'include'
  }
}

export default function AdminPage() {
  useSubscribe()

  //#region Table Column Filters
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  //#endregion

  //#region Table Column Definition
  const createColumn = createColumnHelper<UsersWithStateColumns>()
  const columns = useMemo(
    () => [
      createColumn.accessor('class', {
        id: 'class',
        header: '組',
        enableColumnFilter: true,
        filterFn: (row, columnId, filterValue: number[], _addMeta) =>
          filterValue.includes(row.getValue(columnId)),
      }),
      createColumn.accessor('number', { id: 'number', header: '番' }),
      createColumn.accessor('full_name', {
        id: 'full_name',
        header: '氏名',
        enableColumnFilter: true,
        filterFn: 'includesString',
      }),
      createColumn.accessor('state', {
        id: 'state',
        header: '状態',
        enableColumnFilter: true,
        filterFn: (row, columnId, filterValue: number[], _addMeta) =>
          filterValue.includes(row.getValue(columnId)),
        cell({ getValue }) {
          const value = getValue()
          return value === 'attended'
            ? '出席'
            : value === 'absent'
              ? '欠席'
              : '-'
        },
      }),
    ],
    [createColumn],
  )
  //#endregion

  //#region Data Fetching
  const { data } = useQuery({
    queryKey: [databaseQueryKey],
    queryFn: async () => {
      const response = await supabase
        .from('users_with_state')
        .select('*')
        .order('class', { ascending: true })
        .order('number', { ascending: true })

      return response.data
    },
    placeholderData: (previousData) => previousData ?? [],
    staleTime: Infinity,
    gcTime: Infinity,
  })
  const pageCount = Math.ceil(data!.length / pagination.pageSize)
  //#endregion

  //#region Table Instantiation
  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    setPageIndex,
    getPageCount,
    previousPage,
    nextPage,
    setPageSize,
    getState,
  } = useReactTable<UsersWithStateColumns>({
    data: data!,
    columns,
    pageCount,
    state: {
      pagination,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
  //#endregion

  return (
    <Container maxW='container.xl' my={['3']}>
      <SimpleGrid gap={['2', '5']}>
        <SimpleGrid
          templateColumns='auto 1fr'
          gap='3'
          alignItems='center'
          px={['0', '3']}
        >
          <ClassFilter
            id='class'
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <NameFilter
            id='full_name'
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <StateFilter
            id='state'
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </SimpleGrid>
        <TableContainer
          px={[0, 5]}
          py={[0, 3]}
          borderWidth={['0', '1px']}
          borderRadius='lg'
        >
          <Table variant='simple' size='sm'>
            <Thead>
              {getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      <Text>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Text>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          justify='space-around'
          align='center'
          wrap='wrap'
          columnGap='5'
          rowGap='3'
        >
          <Flex align='center' gap='1'>
            <IconButton
              aria-label=''
              size='sm'
              variant='outline'
              icon={<IconChevronsLeft />}
              onClick={() => setPageIndex(0)}
              disabled={!getCanPreviousPage()}
            />
            <IconButton
              aria-label=''
              size='sm'
              variant='outline'
              icon={<IconChevronLeft />}
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
            />
            <Text mx='2'>
              {`Page ${
                getState().pagination.pageIndex + 1
              } of ${getPageCount()}`}
            </Text>
            <IconButton
              aria-label=''
              size='sm'
              variant='outline'
              icon={<IconChevronRight />}
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
            />
            <IconButton
              aria-label=''
              size='sm'
              variant='outline'
              icon={<IconChevronsRight />}
              onClick={() => setPageIndex(getPageCount() - 1)}
              disabled={!getCanNextPage()}
            />
          </Flex>
          <Flex align='center' gap='2'>
            <Select
              size='sm'
              value={getState().pagination.pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 15, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
            <Text whiteSpace='nowrap'>{'Rows / Page'}</Text>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
