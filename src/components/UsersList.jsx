import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'

const style = {
  container: `flex flex-col p-4 bg-gray-800 rounded-lg shadow-md w-64`,
  title: `text-xl font-bold text-white mb-4`,
  filterContainer: `mb-4`,
  filterToggle: `flex items-center text-white`,
  checkbox: `mr-2 h-4 w-4`,
  userList: `flex flex-col gap-2`,
  userItem: `flex items-center gap-2 p-2 bg-gray-600 rounded hover:bg-gray-500`,
  userPhoto: `h-8 w-8 rounded-full`,
  userName: `text-white font-medium`,
  noUsers: `text-gray-300 text-center p-4`,
  loading: `text-gray-300 text-center p-4 animate-pulse`
}

const UsersList = () => {
  const [filterActive, setFilterActive] = useState(false)
  const { users, loading } = useUsers(filterActive)

  const toggleFilter = () => {
    setFilterActive(!filterActive)
  }

  const renderContent = () => {
    if (loading) {
      return <div className={style.loading}>Завантаження...</div>
    }
    
    if (!users.length) {
      return (
        <div className={style.noUsers}>
          {filterActive ? 'Немає активних користувачів' : 'Немає користувачів'}
        </div>
      )
    }
    
    return users.map((user) => (
      <div key={user.uid} className={style.userItem}>
        <img 
          src={user.photoURL} 
          alt={user.displayName} 
          className={style.userPhoto}
        />
        <span className={style.userName}>{user.displayName}</span>
      </div>
    ))
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>Користувачі</h2>
      
      <div className={style.filterContainer}>
        <label className={style.filterToggle}>
          <input 
            type="checkbox" 
            checked={filterActive}
            onChange={toggleFilter}
            className={style.checkbox}
          />
          Показати тільки активних
        </label>
      </div>
      
      <div className={style.userList}>
        {renderContent()}
      </div>
    </div>
  )
}

export default UsersList 