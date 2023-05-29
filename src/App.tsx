import './App.scss'

import { ChakraProvider, Container } from '@chakra-ui/react'

import { AppProvider } from './Providers'
import CardList from './components/CardList'
import ModalHandler from './components/ModalHandler'
import React from 'react'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AppProvider>
        <Container className="App" maxW="container.lg">
          <CardList />
          <ModalHandler />
        </Container>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
