import { Card, GridItem, Text } from '@chakra-ui/react'

import React from 'react'

const ErrorState: React.FC = () => {
  return (
    <React.Fragment>
      {Array.from({ length: 20 }, (v, i) => i).map((i) => (
        <GridItem key={`failed-${i}`}>
          <Card id="card-item-error" height="60px" data-testid="card-item" direction={{ sm: 'row' }} overflow="hidden" w="200px" variant="filled" className="blocked">
            <Text>...</Text>
          </Card>
        </GridItem>
      ))}
    </React.Fragment>
  )
}

export default ErrorState
