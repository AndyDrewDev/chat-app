import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import UsersList from "./components/UsersList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const style = {
  appContainer: `max-w-[1024px] mx-auto `,
  mainContent: `flex gap-4 `,
  chatContainer: `flex-1 relative mt-10 flex h-[90vh] flex-col border-none bg-gray-100 shadow-xl `,
  usersContainer: `mt-10 `,
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className={style.appContainer}>
      <div className={style.mainContent}>
        <section className={style.chatContainer}>
          <Navbar />
          <Chat />
        </section>
        {user && (
          <div className={style.usersContainer}>
            <UsersList />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
