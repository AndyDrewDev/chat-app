/* eslint-disable react/prop-types */
import { auth } from "../firebase";
import Linkify from "react-linkify";
import { formatDateTime } from "../utils/date";
import { useUser } from "../hooks/useUser";

const style = {
  message: `text-underline relative m-4 min-w-[120px] md:min-w-[150px] items-center rounded-tl-[16px] rounded-tr-[16px] px-3 py-1 md:py-2 shadow-lg max-w-[85%] md:max-w-[70%]`,
  name: `text-xs text-nowrap text-gray-400 mb-1`,
  sent: `flex-row-reverse self-end rounded-bl-[16px] bg-[#395dff] text-white text-start whitespace-pre-wrap mt-1`,
  received: `self-start rounded-br-[16px] bg-[#e5e5ea] text-black text-start whitespace-pre-wrap`,
  messageTimeLeft: `float-right px-0 py-1 text-xs text-nowrap text-gray-400`,
  messageTimeRight: `float-left px-0 py-1 text-xs text-nowrap text-gray-400`,
  messageContainer: `flex items-end`,
  userPhoto: `h-8 w-8 rounded-full mb-4 drop-shadow-lg`,
  photoPlaceholder: `h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs md:text-sm`,
  messageText: `text-sm md:text-base break-words`,
};

const Message = ({ message }) => {
  const uid = message?.uid;
  const isCurrentUser = uid === auth.currentUser?.uid;
  const { user: messageUser } = useUser(isCurrentUser ? null : uid);

  if (!message) {
    return null;
  }

  const date = message?.timestamp?.toDate();
  const formattedDate = formatDateTime(date);

  const photoURL = isCurrentUser
    ? auth.currentUser.photoURL
    : messageUser?.photoURL;

  const renderUserPhoto = () => {
    if (photoURL) {
      return (
        <img src={photoURL} alt="user photo" className={style.userPhoto} />
      );
    }
    return (
      <div className={`${style.userPhoto} ${style.photoPlaceholder}`}>
        {message.name?.charAt(0)?.toUpperCase() || "?"}
      </div>
    );
  };

  if (isCurrentUser) {
    return (
      <div className={`${style.messageContainer} flex-row-reverse`}>
        {renderUserPhoto()}
        <div className={`${style.message} ${style.sent}`}>
          <Linkify>
            <p className={`${style.messageText} ${style.sent}`}>
              {message.text}
            </p>
          </Linkify>
          <span className={style.messageTimeLeft}>{formattedDate}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={style.messageContainer}>
      {renderUserPhoto()}
      <div className={`${style.message} ${style.received}`}>
        <span className={`${style.name} left-1`}>{message.name}</span>
        <Linkify>
          <p className={`${style.messageText} ${style.received}`}>
            {message.text}
          </p>
        </Linkify>
        <span className={style.messageTimeRight}>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Message;
