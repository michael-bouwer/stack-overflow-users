import { createContext, useContext, useState } from 'react'

import React from 'react'
import { User } from './Types'

type AppContext = {
  selectedUser?: User
}

const initialValues = {
  selectedUser: undefined,
}

const appContext = createContext<AppContext>(initialValues)

type Props = {
  children?: React.ReactNode
}

const AppProvider = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<User>()

  const value = {
    selectedUser,
    setSelectedUser,
  }

  return React.createElement(appContext.Provider, { value }, props.children)
}

export const useApp = () => useContext(appContext)

export const Providers = (props: Props) => {

  return <AppProvider>{props.children}</AppProvider>
}
