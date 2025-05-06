import { useRef, useEffect } from "react";
import Message from "./Message";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMessages } from "../hooks/useMessages";

const style = {
  main: `p-3 relative overflow-y-auto h-full`,
  welcomeMessage: `flex items-center justify-center text-gray-500 text-center p-4 text-base h-full `,
};

const audio = new Audio("/audio/tone.mp3");

const Chat = () => {
  const scroll = useRef();
  const { messages } = useMessages();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (scroll.current && messages?.length > 0) {
      console.log("scroll.current", scroll.current);
      scroll.current.scrollIntoView({ behavior: "smooth" });

      if (messages[messages.length - 1].uid !== auth.currentUser.uid) {
        audio.play();
      }
    }
  }, [messages]);

  if (!user) {
    return (
      <div className={style.main}>
        <div className={style.welcomeMessage}>
          <p>Будь ласка, увійдіть, щоб почати спілкування</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.main} data-id="main-chat">
      {messages?.length > 0 ? (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      ) : (
        <div className={style.welcomeMessage}>
          <p>Напишіть перше повідомлення, щоб почати чат!</p>
        </div>
      )}
      <div ref={scroll}></div>
    </div>
  );
};

export default Chat;
