import { useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export const useOnlineStatus = () => {
  const updateLastSeen = () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);

    updateDoc(userRef, {
      lastSeen: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    // Update last seen on initial load
    updateLastSeen();

    // Update last seen when user interacts with the page
    const events = ["touchstart"];
    events.forEach((event) => {
      window.addEventListener(event, updateLastSeen);
    });

    // Update last seen every minute while user is active
    const interval = setInterval(updateLastSeen, 5 * 60 * 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateLastSeen);
      });
      clearInterval(interval);
    };
  }, []);

  return { updateLastSeen };
};
