import { useRef, useEffect, useState } from "react";
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
  const [user] = useAuthState(auth);
  const scroll = useRef();
  const { messages } = useMessages(scroll);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (scroll.current && messages.length > 0 && isMobile) {
      scroll.current.scrollTop = scroll.current.scrollHeight;
    }
  }, [messages, isMobile]);

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
        {Boolean(messages?.length) ? (
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
