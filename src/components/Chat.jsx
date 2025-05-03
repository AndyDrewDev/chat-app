import { useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMessages } from "../hooks/useMessages";

const style = {
  main: `flex flex-col p-[10px] relative overflow-y-scroll h-[90vh] pb-[10px] `,
};

const Chat = () => {
  const [user] = useAuthState(auth);
  const scroll = useRef();
  const { messages } = useMessages(scroll);

  if (!user) return null;

  return (
    <>
      <div className={style.main} ref={scroll} data-id="main-chat">
        {Boolean(messages?.length) &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <SendMessage scroll={scroll} />
    </>
  );
};

export default Chat;
