import {
  ColumnFiltersState,
  OnChangeFn,
  TableState,
  Updater,
} from '@tanstack/react-table'

export interface FilterProps {
  id: string
  columnFilters: ColumnFiltersState
  setColumnFilters: OnChangeFn<ColumnFiltersState>
}
