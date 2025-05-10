import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user
        
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: serverTimestamp()
    }, { merge: true });
    
    return user;
  } catch (error) {
    console.error('Error during Google sign in:', error);
    throw error;
  }
}
