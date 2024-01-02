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
            (cachedRows: UsersWithStateColumns[] | undefined) =>
              cachedRows?.map?.((cachedRow) =>
                newRow.class === cachedRow.class &&
                newRow.number === cachedRow.number
                  ? { ...cachedRow, ...newRow }
                  : cachedRow,
              ),
          )
          break
        }
        case 'DELETE': {
          queryClient.setQueryData(
            ['database'],
            (cachedRows: UsersWithStateColumns[] | undefined) =>
              cachedRows?.map?.((cachedRow) =>
                oldRow.class === cachedRow.class &&
                oldRow.number === cachedRow.number
                  ? {
                      ...cachedRow,
                      state: 'unspecified',
                      updated_at: null,
                    }
                  : cachedRow,
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
