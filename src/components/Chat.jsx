import { useRef, useEffect, useState } from "react";
import Message from "./Message";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMessages } from "../hooks/useMessages";
import useAudio from "../hooks/useAudio";

const style = {
  main: `p-3 relative overflow-y-auto h-full`,
  welcomeMessage: `flex items-center justify-center text-gray-500 text-center p-4 text-base h-full `,
};

const Chat = () => {
  const scroll = useRef();
  const [user] = useAuthState(auth);
  const { messages } = useMessages();
  const [lastMessageId, setLastMessageId] = useState(null);
  const { playSound } = useAudio("/audio/tone.mp3");

  useEffect(() => {
    if (scroll.current && messages?.length > 0) {
      scroll.current.scrollIntoView({ behavior: "smooth" });

      const lastMessage = messages[messages.length - 1];

      if (
        lastMessage.id !== lastMessageId &&
        lastMessage.uid !== auth.currentUser?.uid
      ) {
        playSound();
        setLastMessageId(lastMessage.id);
      }
    }
  }, [messages, playSound, lastMessageId]);

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
