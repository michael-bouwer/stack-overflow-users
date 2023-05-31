import { Center, Divider, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'

import CardItem from './CardItem'
import React from 'react'
import { useApp } from '../Providers'

const CardList: React.FC = () => {
  const { currentUsers } = useApp()

  if (!currentUsers) return null

  return (
    <VStack p="16px">
      <Heading as="h2" size="xl" mb="32px" data-testid="app-heading-test">
        Stack Overflow Users by Reputation
      </Heading>
      <Divider style={{ borderColor: 'var(--chakra-colors-chakra-border-color)', marginBottom: '32px' }} />
      {currentUsers && currentUsers.data.items.length > 0 ? (
        <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {currentUsers.data.items.map((item) => (
            <GridItem key={item.user_id}>
              <Center h="100%">
                <CardItem user={item} />
              </Center>
            </GridItem>
          ))}
        </Grid>
      ) : null}
    </VStack>
  )
}

export default CardList
