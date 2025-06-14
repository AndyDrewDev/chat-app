import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";

export const useUsers = (filterActive = false) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeTimeLimit = Timestamp.fromDate(
      new Date(Date.now() - 5 * 60 * 1000),
    );

    let q = query(collection(db, "users"));

    if (filterActive) {
      q = query(
        collection(db, "users"),
        where("lastSeen", ">=", activeTimeLimit),
        orderBy("lastSeen", "desc"),
      );
    }

    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [filterActive]);

  return { users, loading, setUsers };
};
