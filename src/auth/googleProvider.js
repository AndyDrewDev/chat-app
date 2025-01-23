import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}
