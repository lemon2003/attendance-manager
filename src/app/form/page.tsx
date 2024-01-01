'use client'

import { FormEventHandler, MouseEventHandler, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  VStack,
  Text,
  chakra,
  useDisclosure,
  SimpleGrid,
  ModalFooter,
  useToast,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { supabase } from '@/client/supabase'
import { UsersWithStateColumns } from '@/schema/database'

export interface FormRecord {
  class: number
  number: number
}

export default function FormPage() {
  const router = useRouter()
  const toast = useToast()

  const {
    register,
    watch,
    getValues,
    formState: { dirtyFields },
  } = useForm<FormRecord>({})

  const {
    data: users,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['database'],
    queryFn: async () => {
      const res = await supabase
        .from('users_with_state')
        .select('*')
        .eq('class', watch('class'))

      return res.data
    },
    enabled: !!dirtyFields.class && !isNaN(watch('class')),
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const [selectedUser, setSelectedUser] = useState<UsersWithStateColumns>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSelectedUser(users!.find((user) => user.number == getValues('number'))!)
    onOpen()
  }

  const handleConfirm: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsSubmitting(true)
    router.prefetch('/success')

    const res = await supabase
      .from('user_states')
      .upsert({
        class: selectedUser!.class as number,
        number: selectedUser!.number as number,
        state: 'attended',
      })
      .select()

    setIsSubmitting(false)

    if (res.error) {
      onClose()
      toast({
        title: 'Error',
        status: 'error',
        isClosable: true,
        duration: 10,
      })
    }

    router.push('/success')
  }

  return (
    <>
      <Container py='10'>
        <VStack align='stretch' alignContent='center' gap='10'>
          <chakra.form display='contents' onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>{'1. クラスを選択してください'}</FormLabel>
              <Select
                {...register('class', {
                  valueAsNumber: true,
                })}
              >
                <option hidden>{'選択してください...'}</option>
                {[1, 2, 3, 4, 5, 6, 7].map((classNumber) => (
                  <option key={classNumber} value={classNumber}>
                    {`${classNumber} 組`}
                  </option>
                ))}
              </Select>
            </FormControl>
            {isFetching ? (
              <Spinner />
            ) : isSuccess ? (
              <FormControl>
                <FormLabel>{'2. ご氏名を選択してください'}</FormLabel>
                <Select {...register('number')}>
                  <option hidden>{'選択してください...'}</option>
                  {users?.map((user) => (
                    <option key={user.number} value={user.number!}>
                      {`${user.number?.toString().padStart(2, '\u2007')}. ${
                        user.full_name
                      }`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            {dirtyFields.number && (
              <Button type='submit' alignSelf='end'>
                {'Submit'}
              </Button>
            )}
          </chakra.form>
        </VStack>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalContent>
            <ModalHeader>{'確認'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align='start'>
                <Text>{'入力された情報: '}</Text>
                <SimpleGrid
                  alignSelf='center'
                  templateColumns='1fr 1fr'
                  columnGap='3'
                  fontSize='larger'
                >
                  <Text align='end'>{'クラス :'}</Text>
                  <Text>{selectedUser?.class}</Text>
                  <Text align='end'>{'番号 :'}</Text>
                  <Text>{selectedUser?.number}</Text>
                  <Text align='end'>{'ご氏名 :'}</Text>
                  <Text>{selectedUser?.full_name}</Text>
                </SimpleGrid>
                <Text>{'よろしいですか？'}</Text>
              </VStack>
            </ModalBody>
            <ModalFooter justifyItems='end' gap='3'>
              <Button variant='ghost' onClick={onClose}>
                {'取り消す'}
              </Button>
              <Button
                variant={isSubmitting ? 'loading' : 'solid'}
                onClick={handleConfirm}
              >
                {'確認'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalContent>
      </Modal>
    </>
  )
}
