import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { URL_getUsers, withinTTL } from './Lib'
import { User, UserListData, UserListResult } from './Types'

import React from 'react'
import localforage from 'localforage'

/**
 *
 * @returns App wide context for global state management
 */
export const useApp = () => useContext(appContext)

type AppContext = {
  selectedUser: User | null
  setSelectedUser: Dispatch<SetStateAction<User | null>>
  currentUsers: UserListData | null
  setCurrentUsers: Dispatch<SetStateAction<UserListData | null>>
}

const initialValues = {
  selectedUser: null,
  setSelectedUser: () => {},
  currentUsers: null,
  setCurrentUsers: () => {},
}

const appContext = createContext<AppContext>(initialValues)

/**
 * Generit props interface
 */
export type Props = {
  children?: React.ReactNode
}

/**
 *
 * @param props The only props passed here are the child nodes of the application
 * @returns App context provider
 */
export const AppProvider = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentUsers, setCurrentUsers] = useState<UserListData | null>(null)

  useEffect(() => {
    /**
     * Fetch data from local storage.
     * If the data is stale (> 5 minutes old), then fetch new data.
     */
    const getData = async () => {
      const cachedData: UserListResult | null = await localforage.getItem('cachedUserList')
      if (cachedData?.data && withinTTL(cachedData.time_queried)) setCurrentUsers(cachedData.data)
      else {
        fetch(URL_getUsers)
          .then((data) => data.json())
          .then((data) => {
            if (data) {
              console.log('resetting cache...')
              setCurrentUsers(data)
              localforage.setItem('cachedUserList', { data, time_queried: new Date() } as UserListResult)
            }
          })
      }
    }

    getData()
  }, [setCurrentUsers])

  const value = {
    selectedUser,
    setSelectedUser,
    currentUsers,
    setCurrentUsers,
  }

  return React.createElement(appContext.Provider, { value }, props.children)
}
