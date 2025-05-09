import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const style = {
  container: `flex flex-col p-4 bg-gray-800 rounded-lg shadow-md w-full md:w-64 h-full md:h-auto`,
  title: `text-xl font-bold text-white mb-4 flex justify-between items-center`,
  filterContainer: `mb-4`,
  filterToggle: `flex items-center text-white`,
  checkbox: `mr-2 h-4 w-4`,
  userList: `flex flex-col gap-2 overflow-y-auto`,
  userItem: `flex items-center gap-2 p-2 bg-gray-600 rounded hover:bg-gray-500`,
  userPhoto: `h-8 w-8 rounded-full`,
  userPhotoActive: `h-8 w-8 rounded-full border-2 border-green-500`,
  userName: `text-white font-medium truncate`,
  noUsers: `text-gray-300 text-center p-4`,
  loading: `text-gray-300 text-center p-4 animate-pulse`,
  closeButton: `text-white hover:text-gray-300`,
};

const UsersList = ({ isMobile, onClose }) => {
  const [filterActive, setFilterActive] = useState(false);
  const { users, loading } = useUsers(filterActive);

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const renderContent = () => {
    if (loading) {
      return <div className={style.loading}>Завантаження...</div>;
    }

    if (!users.length) {
      return (
        <div className={style.noUsers}>
          {filterActive ? "Немає активних користувачів" : "Немає користувачів"}
        </div>
      );
    }

    return users.map((user) => {
      const isActive =
        user.lastSeen &&
        new Date().getTime() - user.lastSeen.toDate().getTime() <=
          5 * 60 * 1000;


      return (
        <div key={user.uid} className={style.userItem}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className={isActive ? style.userPhotoActive : style.userPhoto}
          />
          <span className={style.userName}>{user.displayName}</span>
        </div>
      );
    });
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>Користувачі</h2>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className={style.closeButton}
            aria-label="Close users panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

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

      <div
        className={`${style.userList} ${isMobile ? "max-h-[calc(100vh-120px)]" : "max-h-[500px]"}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default UsersList;
