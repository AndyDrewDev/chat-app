// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { getFirestore, Timestamp } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvM64ykps3LBH60ONpMRz7CNqBz3nFZBI',
  authDomain: 'chatapp-6f94a.firebaseapp.com',
  projectId: 'chatapp-6f94a',
  storageBucket: 'chatapp-6f94a.firebasestorage.app',
  messagingSenderId: '203536820526',
  appId: '1:203536820526:web:96c76be666122f2e4272bf',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const timestamp = Timestamp
