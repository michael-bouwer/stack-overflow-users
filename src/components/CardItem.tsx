import { Badge, Card, CardBody, Heading, Image, Stack } from '@chakra-ui/react'

import React from 'react'
import { User } from '../Types'
import { useApp } from '../Providers'

type Props = {
  user: User
}

const CardItem: React.FC<Props> = ({ user }) => {
  const { setOpen, setSelectedUser } = useApp()

  return (
    <Card
      id="card-item"
      direction={{ sm: 'row' }}
      overflow="hidden"
      w="100%"
      onClick={() => {
        setSelectedUser(user)
        setOpen(true)
      }}
    >
      <Image objectFit="cover" maxW={{ base: '60px' }} src={user.profile_image} alt={user.display_name} />
      {user.following && (
        <Badge colorScheme="green" style={{ position: 'absolute', top: 0, right: 8 }}>
          Success
        </Badge>
      )}

      <Stack>
        <CardBody>
          <Heading size="sm">{user.display_name}</Heading>

          {/* <Text>Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.</Text> */}
        </CardBody>

        {/* <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Latte
          </Button>
        </CardFooter> */}
      </Stack>
    </Card>
  )
}

export default CardItem
