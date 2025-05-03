import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const audio = new Audio("/src/audio/tone.mp3");

export const useMessages = (scroll) => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);

      setTimeout(() => {
        if (scroll.current) {
          scroll.current.scrollTop = scroll.current.scrollHeight;
        }
        if (messages[messages.length - 1].uid !== auth.currentUser.uid) {
          audio.play();
        }
      }, 300);
    });
    return () => unsubscribe();
  }, [scroll, user]);
  return { messages, setMessages };
};
