import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const audio = new Audio('/src/audio/tone.mp3')

export const useMessages = (scroll) => {
  const [messages, setMessages] = useState([])

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
  }, [scroll])
  return { messages, setMessages }
}
