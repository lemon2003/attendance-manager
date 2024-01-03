import { useCallback, useEffect } from 'react'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/client/supabase'
import { UserStatesColumns, UsersWithStateColumns } from '@/schema/database'
import { databaseQueryKey } from './page-client'

export const useSubscribe = () => {
  const queryClient = useQueryClient()

  const handleChange = useCallback(
    (payload: RealtimePostgresChangesPayload<UserStatesColumns>) => {
      const { old: oldRow, new: newRow, eventType } = payload
      switch (eventType) {
        case 'INSERT':
        case 'UPDATE': {
          queryClient.setQueryData(
            [databaseQueryKey],
            (cache: UsersWithStateColumns[][] | undefined) =>
              cache?.map?.((cachedColumn) =>
                cachedColumn[0].class === newRow.class
                  ? cachedColumn.map((cachedRow) =>
                      cachedRow.number === newRow.number
                        ? { ...cachedRow, ...newRow }
                        : cachedRow,
                    )
                  : cachedColumn,
              ),
          )
          break
        }
        case 'DELETE': {
          queryClient.setQueryData(
            [databaseQueryKey],
            (cache: UsersWithStateColumns[][] | undefined) =>
              cache?.map?.((cachedColumn) =>
                cachedColumn[0].class === oldRow.class
                  ? cachedColumn.map((cachedRow) =>
                      cachedRow.number === oldRow.number
                        ? {
                            ...cachedRow,
                            state: 'unspecified',
                            updated_at: null,
                          }
                        : cachedRow,
                    )
                  : cachedColumn,
              ),
          )
          break
        }
      }
    },
    [queryClient],
  )

  useEffect(() => {
    const channel = supabase
      .channel('table-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_states',
        },
        handleChange,
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [handleChange])
}
