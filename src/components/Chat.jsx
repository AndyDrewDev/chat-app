import { useRef, useEffect } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMessages } from "../hooks/useMessages";

const style = {
  main: `flex flex-col p-[5px] md:p-[10px] relative overflow-y-scroll h-[90vh] pb-[100px]`,
  welcomeMessage: `flex justify-center items-center h-full text-gray-500 text-center p-4 text-sm md:text-base`,
};

const Chat = () => {
  const scroll = useRef();
  const [user] = useAuthState(auth);
  const { messages } = useMessages(scroll);

  useEffect(() => {
    if (scroll.current && messages?.length > 0) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  }, [messages]);

  if (!user) {
    return (
      <div className={style.main}>
        <div className={style.welcomeMessage}>
          <p>Будь ласка, увійдіть до системи, щоб почати спілкування</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={style.main} ref={scroll} data-id="main-chat">
        {messages?.length > 0 ? (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <div className={style.welcomeMessage}>
            <p>Напишіть перше повідомлення, щоб почати чат!</p>
          </div>
        )}
      </div>
      <SendMessage scroll={scroll} />
    </>
  );
};

export default Chat;
