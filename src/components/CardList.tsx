import React from 'react'
import { useApp } from '../Providers'

const CardList: React.FC = () => {
  const { currentUsers } = useApp()

  if (!currentUsers) return null

  return (
    <div>
      {currentUsers && currentUsers.items.length > 0 ? (
        <ul>
          {currentUsers.items.map((item) => (
            <li key={item.user_id}>{item.display_name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default CardList
