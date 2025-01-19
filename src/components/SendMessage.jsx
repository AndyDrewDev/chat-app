import { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import EmojiPicker from 'emoji-picker-react'
import EmojiButton from './EmojiButton'

const style = {
  form: `h-14 w-full max-w-[728px] flex text-xl absolute bottom-0`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-[#395dff] hover:bg-green-500 text-white`,
}
const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState('')
  const [isOpenPicker, setIsOpenPicker] = useState(false)

  const togglePicker = () => {
    setIsOpenPicker(!isOpenPicker)
  }

  const sendMessage = async (e) => {
    if (input.trim() === '') {
      alert('Please enter a valid message')
      return
    }
    e.preventDefault()
    const { uid, displayName } = auth.currentUser
    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    })
    setInput('')
    scroll.current.scrollTop = scroll.current.scrollHeight
  }

  const handleEmojiClick = (emojiData) => {
    setInput((previousInput) => previousInput + emojiData.emoji)
  }

  return (
    <>
      <form onSubmit={sendMessage} className={style.form}>
        <EmojiButton onClick={togglePicker} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsOpenPicker(false)}
          className={style.input}
          type='text'
          placeholder='Type a message...'
        />

        <button className={style.button} type='submit'>
          Send
        </button>
      </form>
      <EmojiPicker
        open={isOpenPicker}
        height={450}
        style={{ position: 'absolute', bottom: '70px', left: '10px' }}
        onEmojiClick={handleEmojiClick}
      />
    </>
  )
}

export default SendMessage
