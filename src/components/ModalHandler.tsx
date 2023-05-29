import { Badge, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import React from 'react'
import { useApp } from '../Providers'

const ModalHandler: React.FC = () => {
  const { open, setOpen, selectedUser, setSelectedUser } = useApp()

  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  if (!selectedUser) return null

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedUser.display_name} <br /> {!selectedUser.following && <Badge colorScheme="green">Success</Badge>}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Image objectFit="cover" p="16px" w="50%" borderRadius="100%" src={selectedUser.profile_image} alt={selectedUser.display_name} />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalHandler
