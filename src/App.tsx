import './App.scss'

import React, { useEffect, useState } from 'react'

import { URL_getUsers } from './Lib'
import { UserListResult } from './Types'

const App = () => {
  const [userList, setUserList] = useState<UserListResult>()

  useEffect(() => {
    fetch(URL_getUsers)
      .then((data) => data.json())
      .then((data) => data && setUserList(data))
  }, [])

  if (!userList || !userList.items) return null

  return (
    <div className="App">
      {userList && userList.items.length > 0 ? (
        <ul>
          {userList.items.map((item) => (
            <li key={item.user_id}>{item.display_name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default App
