import { Badge, Button, Center, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react'

import React from 'react'
import { useApp } from '../Providers'

const ModalHandler: React.FC = () => {
  const { open, setOpen, selectedUser, setSelectedUser, updateCurrentUsers } = useApp()

  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  const _handleFollowAction = (action: 'follow' | 'unfollow') => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        following: action === 'follow',
      })
      updateCurrentUsers([action, selectedUser])
      setOpen(false)
    }
  }

  const _handleBlockAction = (action: 'block' | 'unblock') => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        blocked: action === 'block',
      })
      updateCurrentUsers([action, selectedUser])
      setOpen(false)
    }
  }

  if (!selectedUser) return null

  return (
    <Modal isOpen={open} onClose={handleClose} data-testid='modal-test'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedUser.display_name} {selectedUser.following && <Badge colorScheme="green">Following</Badge>}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Image objectFit="cover" p="16px" w="50%" height={100} width={100} borderRadius="10%" src={selectedUser.profile_image} alt={selectedUser.display_name} />
            <VStack align="stretch">
              <Text>{selectedUser.display_name}</Text>
              <Text>Reputation: {selectedUser.reputation}</Text>
            </VStack>
          </HStack>
        </ModalBody>
        <Center>
          <ModalFooter>
            {!selectedUser.following ? (
              <Button colorScheme="green" mr="4" w="100px" onClick={() => _handleFollowAction('follow')}>
                Follow
              </Button>
            ) : (
              <Button variant="outline" mr="4" w="100px" onClick={() => _handleFollowAction('unfollow')}>
                Unfollow
              </Button>
            )}

            {!selectedUser.blocked && (
              <Button colorScheme="red" w="100px" onClick={() => _handleBlockAction('block')}>
                Block
              </Button>
            )}
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  )
}

export default ModalHandler
