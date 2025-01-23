/* eslint-disable react/prop-types */
import { auth } from '../firebase'
import Linkify from 'react-linkify'
import { formatDateTime } from '../utils/date'

const style = {
  message: `relative min-w-[150px] items-center shadow-xl px-3 py-2 m-4 rounded-tl-[16px] rounded-tr-[16px] text-underline`,
  //right-[12px] left-[12px]
  name: `text-gray-600 text-xs absolute top-[-22px] text-nowrap`,
  sent: `bg-[#395dff] text-white flex-row-reverse rounded-bl-[16px] text-end self-end`,
  received: `bg-[#e5e5ea] text-black rounded-br-[16px] text-start self-start`,
  messageTimeLeft: `text-gray-400 text-xs py-1 px-0 text-nowrap float-right`,
  messageTimeRight: `text-gray-400 text-xs py-1 px-0 text-nowrap float-left`,
}
const Message = ({ message }) => {
  if (!message) return

  const date = message?.timestamp?.toDate()
  const formattedDate = formatDateTime(date)

  if (message.uid === auth.currentUser.uid) {
    return (
      <div className={`${style.message} ${style.sent}`}>
        <span className={`${style.name} right-1 text-end`}>{message.name}</span>
        <Linkify>
          <p className={`${style.sent} text-start`}>{message.text}</p>
        </Linkify>
        <span className={style.messageTimeLeft}>{formattedDate}</span>
      </div>
    )
  }
  return (
    <div className={`${style.message} ${style.received}`}>
      <span className={`${style.name} left-1`}>{message.name}</span>
      <Linkify>
        <p className={`${style.received} text-start`}>{message.text}</p>
      </Linkify>
      <span className={style.messageTimeRight}>{formattedDate}</span>
    </div>
  )
}

export default Message
