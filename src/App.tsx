import './App.scss'

import { ChakraProvider, Container } from '@chakra-ui/react'

import { AppProvider } from './Providers'
import CardList from './components/CardList'
import React from 'react'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AppProvider>
        <Container className="App" bg="blue.300">
          <CardList />
        </Container>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
