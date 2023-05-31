import { Button, Center, Divider, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'

import CardItem from './CardItem'
import ErrorState from './ErrorState'
import React from 'react'
import { useApp } from '../Providers'

const CardList: React.FC = () => {
  const { currentUsers, error } = useApp()

  return (
    <VStack p="16px">
      <Heading as="h2" size="xl" mb="32px" data-testid="app-heading-test">
        Stack Overflow Users by Reputation
      </Heading>
      <Divider style={{ borderColor: 'var(--chakra-colors-chakra-border-color)', marginBottom: '32px' }} />
      {error && (
        <Center>
          <VStack mb={41}>
            <Text fontSize="2xl">Something went wrong</Text>
            <Button onClick={() => window.location.reload()}>Refresh?</Button>
          </VStack>
        </Center>
      )}
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {currentUsers &&
          currentUsers.data.items.map((item) => (
            <GridItem key={item.user_id}>
              <Center h="100%">
                <CardItem user={item} />
              </Center>
            </GridItem>
          ))}
        {error && <ErrorState />}
      </Grid>
    </VStack>
  )
}

export default CardList
