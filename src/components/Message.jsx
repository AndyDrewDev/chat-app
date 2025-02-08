/* eslint-disable react/prop-types */
import { auth } from "../firebase";
import Linkify from "react-linkify";
import { formatDateTime } from "../utils/date";

const style = {
  message: `text-underline relative m-4 min-w-[150px] items-center rounded-tl-[16px] rounded-tr-[16px] px-3 py-2 shadow-xl`,
  name: `absolute top-[-22px] text-xs text-nowrap text-gray-600`,
  sent: `flex-row-reverse self-end rounded-bl-[16px] bg-[#395dff] text-end text-white text-start whitespace-pre-wrap`,
  received: `self-start rounded-br-[16px] bg-[#e5e5ea] text-black text-start whitespace-pre-wrap`,
  messageTimeLeft: `float-right px-0 py-1 text-xs text-nowrap text-gray-400`,
  messageTimeRight: `float-left px-0 py-1 text-xs text-nowrap text-gray-400`,
};
const Message = ({ message }) => {
  if (!message) return;

  const date = message?.timestamp?.toDate();
  const formattedDate = formatDateTime(date);

  if (message.uid === auth.currentUser.uid) {
    return (
      <div className={`${style.message} ${style.sent}`}>
        <span className={`${style.name} right-1 text-end`}>{message.name}</span>
        <Linkify>
          <p className={`${style.sent}`}>{message.text}</p>
        </Linkify>
        <span className={style.messageTimeLeft}>{formattedDate}</span>
      </div>
    );
  }
  return (
    <div className={`${style.message} ${style.received}`}>
      <span className={`${style.name} left-1`}>{message.name}</span>
      <Linkify>
        <p className={`${style.received}`}>{message.text}</p>
      </Linkify>
      <span className={style.messageTimeRight}>{formattedDate}</span>
    </div>
  );
};

export default Message;
