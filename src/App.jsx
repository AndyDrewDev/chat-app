import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import UsersList from "./components/UsersList";
import SendMessage from "./components/SendMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { useOnlineStatus } from "./hooks/useOnlineStatus";

const style = {
  appContainer: `bg-gray-100`,
  mainContent: ` flex justify-center gap-4 h-dvh md:mx-4`,
  chatContainer: `relative flex flex-col shadow-xl w-full md:w-3xl`,
  usersContainer: `mt-16`,
  mobileUsersOverlay: `fixed inset-0 bg-black/25 z-20 transition-opacity duration-300 ease-in-out`,
  mobileUsersPanel: `rounded-l-xl fixed right-0 top-0 h-full w-3/4 max-w-xs z-30 transform transition-transform duration-300 ease-in-out bg-gray-800 shadow-xl`,
};

function App() {
  const [user] = useAuthState(auth);
  const [showUsers, setShowUsers] = useState(false);

  useOnlineStatus();

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

        {user && (
          <div className={`${style.usersContainer} hidden md:block`}>
            <UsersList />
          </div>
        )}
      </div>

      {user && (
        <div
          className={`${style.mobileUsersOverlay} ${showUsers ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={toggleUsers}
        ></div>
      )}

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
