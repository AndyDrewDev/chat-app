import { useState, useEffect, useRef } from 'react'
import Message from './Message'
import SendMessage from './SendMessage'
import { db, auth } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const style = {
  main: `flex flex-col p-[10px] relative overflow-y-scroll h-[90vh] pb-[60px]`,
}

const audio = new Audio('/src/audio/tone.mp3')

const Chat = () => {
  const [messages, setMessages] = useState([])
  const scroll = useRef()

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages)

      setTimeout(() => {
        scroll.current.scrollTop = scroll.current.scrollHeight
        if (messages[messages.length - 1].uid !== auth.currentUser.uid) {
          audio.play()
        }
      }, 300)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <div className={style.main} ref={scroll} data-id='main-chat'>
        {Boolean(messages?.length) &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </div>
      <SendMessage scroll={scroll} />
    </>
  )
}

export default Chat
