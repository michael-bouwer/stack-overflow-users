import { Badge, Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'

import React from 'react'
import { User } from '../Types'
import { useApp } from '../Providers'

type Props = {
  user: User
}

const CardItem: React.FC<Props> = ({ user }) => {
  const { setOpen, setSelectedUser } = useApp()

  const handleUserClicked = () => {
    if (user.blocked) return
    setSelectedUser(user)
    setOpen(true)
  }

  return (
    <Card
      id="card-item"
      data-testid="card-item"
      direction={{ sm: 'row' }}
      overflow="hidden"
      w="100%"
      variant={user.blocked ? 'filled' : 'elevated'}
      className={!user.blocked ? 'active' : 'blocked'}
      onClick={handleUserClicked}
    >
      <Image objectFit="cover" maxW={{ base: '60px' }} src={user.profile_image} alt={user.display_name} />
      <Box style={{ display: 'flex', position: 'absolute', top: 0, right: 8 }}>
        {user.following && !user.blocked && (
          <Badge colorScheme="green" mr={user.blocked ? '4px' : '0'}>
            Following
          </Badge>
        )}
      </Box>

      <Stack>
        <CardBody>
          <Heading size="sm">{user.display_name}</Heading>
          <Text>{user.reputation}</Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default CardItem
