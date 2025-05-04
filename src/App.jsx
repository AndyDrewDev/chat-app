import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import UsersList from "./components/UsersList";
import SendMessage from "./components/SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";

const style = {
  appContainer: `max-w-[1024px] h-[100vh] mx-auto px-4 relative`,
  mainContent: `flex flex-col md:flex-row gap-4 h-[100vh] md:h-[calc(100vh-20px)]`,
  chatContainer: `flex-1 relative mt-0 md:mt-10 flex flex-col border-none bg-gray-100 shadow-xl h-auto overflow-hidden`,
  usersContainer: `mt-2 md:mt-10`,
  mobileUsersOverlay: `fixed inset-0 bg-black/25 z-20 transition-opacity duration-300 ease-in-out`,
  mobileUsersPanel: `rounded-l-xl fixed right-0 top-0 h-full w-3/4 max-w-xs z-30 transform transition-transform duration-300 ease-in-out bg-gray-800 shadow-xl`,
};

function App() {
  const [user] = useAuthState(auth);
  const [showUsers, setShowUsers] = useState(false);

  // Close users panel when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowUsers(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className={style.appContainer}>
      <div className={style.mainContent}>
        <section className={style.chatContainer}>
          <Navbar toggleUsers={toggleUsers} />
          <Chat />
          {user && <SendMessage />}
        </section>

        {/* Desktop Users List */}
        {user && (
          <div className={`${style.usersContainer} hidden md:block`}>
            <UsersList />
          </div>
        )}
      </div>

      {/* Mobile Users Overlay - відображати тільки коли панель відкрита */}
      {user && (
        <div
          className={`${style.mobileUsersOverlay} ${showUsers ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={toggleUsers}
        ></div>
      )}

      {/* Mobile Users Panel - завжди присутня в DOM, але переміщується за допомогою transform */}
      {user && (
        <div
          className={`${style.mobileUsersPanel} ${
            showUsers ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <UsersList isMobile={true} onClose={toggleUsers} />
        </div>
      )}
    </div>
  );
}

export default App;
