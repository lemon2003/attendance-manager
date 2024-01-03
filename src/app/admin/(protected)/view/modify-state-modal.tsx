'use client'

import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

interface ModifyStateModalProps {
  isOpen: boolean
  onClose: () => void
  fontSize: number
  setFontSize: (value: number) => void
}

export const ModifyStateModal = React.memo(function ModifyStateModal({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
}: ModifyStateModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>フォントサイズ</FormLabel>
            <NumberInput
              min={10}
              max={16}
              value={fontSize}
              onChange={(_, n) => setFontSize(n)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={onClose}>閉じる</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
