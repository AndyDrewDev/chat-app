import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const callToUnsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => callToUnsubscribe();
  }, [user]);

  return { messages, setMessages };
};
