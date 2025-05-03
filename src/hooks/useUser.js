import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

export const useUser = (uid) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) {
        setLoading(false)
        return
      }

      try {
        const userRef = doc(db, 'users', uid)
        const userSnap = await getDoc(userRef)
        
        if (userSnap.exists()) {
          setUser({ ...userSnap.data(), id: userSnap.id })
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [uid])

  return { user, loading }
} 