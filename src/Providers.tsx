/* eslint-disable @typescript-eslint/no-empty-function */

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useReducer, useState } from 'react'
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
  currentUsers: UserListResult | null
  updateCurrentUsers: Dispatch<[Actions, User | UserListResult]>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const initialValues = {
  selectedUser: null,
  setSelectedUser: () => {},
  currentUsers: null,
  updateCurrentUsers: () => {},
  open: false,
  setOpen: () => {},
}

const appContext = createContext<AppContext>(initialValues)

/**
 * Generit props interface
 */
export type Props = {
  children?: React.ReactNode
}

const isUser = (data: User | UserListResult): data is User => {
  return (data as User).account_id !== undefined
}

type Actions = 'init' | 'follow' | 'unfollow' | 'block' | 'unblock'

const reducer = (prevState: UserListResult | null, [action, data]: [Actions, User | UserListResult]): UserListResult | null => {
  switch (action) {
    case 'init':
      return data as UserListResult
    case 'follow':
      if (isUser(data) && !data.following && prevState) {
        const filtered = { ...prevState }
        filtered.data.items.forEach((u) => {
          if (u.account_id === data.account_id) u.following = true
        })
        localforage.setItem('cachedUserList', { data: filtered.data, time_queried: filtered.time_queried })
        return { ...filtered }
      }
      return prevState
    case 'unfollow':
      if (isUser(data) && data.following && prevState) {
        const filtered = { ...prevState }
        filtered.data.items.forEach((u) => {
          if (u.account_id === data.account_id) u.following = false
        })
        localforage.setItem('cachedUserList', { data: filtered.data, time_queried: filtered.time_queried })
        return { ...filtered }
      }
      return prevState
    case 'block':
      if (isUser(data) && !data.blocked && prevState) {
        const filtered = { ...prevState }
        filtered.data.items.forEach((u) => {
          if (u.account_id === data.account_id) u.blocked = true
        })
        localforage.setItem('cachedUserList', { data: filtered.data, time_queried: filtered.time_queried })
        return { ...filtered }
      }
      return prevState
    case 'unblock':
      if (isUser(data) && data.blocked && prevState) {
        const filtered = { ...prevState }
        filtered.data.items.forEach((u) => {
          if (u.account_id === data.account_id) u.blocked = false
        })
        localforage.setItem('cachedUserList', { data: filtered.data, time_queried: filtered.time_queried })
        return { ...filtered }
      }
      return prevState
    default:
      return prevState
  }
}

/**
 *
 * @param props The only props passed here are the child nodes of the application
 * @returns App context provider
 */
export const AppProvider = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentUsers, updateCurrentUsers] = useReducer(reducer, null) //useState<UserListData | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    /**
     * Fetch data from local storage.
     * If the data is stale (> 5 minutes old), then fetch new data.
     */
    const getData = async () => {
      const cachedData: UserListResult | null = await localforage.getItem('cachedUserList')
      if (cachedData?.data && withinTTL(cachedData.time_queried)) updateCurrentUsers(['init', cachedData])
      else {
        fetch(URL_getUsers)
          .then((data) => data.json())
          .then((data: UserListData) => {
            if (data) {
              console.log('resetting cache...')
              const current = new Date()
              const newData = {
                data: {
                  ...data,
                  items: data.items.map((d) => {
                    return {
                      ...d,
                      following: cachedData?.data?.items?.find((item) => d.account_id === item.account_id)?.following || false,                      
                      blocked: cachedData?.data?.items?.find((item) => d.account_id === item.account_id)?.blocked || false,
                    }
                  }),
                },
                time_queried: current,
              }
              updateCurrentUsers(['init', newData])
              localforage.setItem('cachedUserList', newData)
            }
          })
      }
    }
    getData()
  }, [])

  const value = {
    selectedUser,
    setSelectedUser,
    currentUsers,
    updateCurrentUsers,
    open,
    setOpen,
  }

  return React.createElement(appContext.Provider, { value }, props.children)
}
