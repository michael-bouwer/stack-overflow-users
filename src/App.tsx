import './App.scss'

import { ChakraProvider, Container } from '@chakra-ui/react'

import CardList from './components/CardList'
import { Providers } from './Providers'
import React from 'react'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Providers>
        <Container className="App" bg="blue.300">
          <CardList />
        </Container>
      </Providers>
    </ChakraProvider>
  )
}

export default App
