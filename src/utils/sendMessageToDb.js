import { auth, db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export const sendMessageToDb = async (input) => {
  const { uid, displayName } = auth.currentUser
  await addDoc(collection(db, 'messages'), {
    text: input,
    name: displayName,
    uid,
    timestamp: serverTimestamp(),
  })
}
