import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import User from "./User";
import SignIn from "./SignIn";
import LogOut from "./SignOutButton";

const style = {
  nav: `relative sticky top-0 z-10 mb-0 flex h-auto min-h-[64px] items-center rounded-b-lg bg-gray-800 p-2 md:rounded-lg md:p-4`,
  heading: `text-white text-xl md:text-2xl font-bold absolute left-1/2 transform -translate-x-1/2`,
  userContainer: `flex-shrink-0 ml-0`,
  actionButtons: `flex items-center gap-2 md:gap-4 ml-auto`,
  userIcon: `rounded-full bg-gray-700 p-2 text-white hover:bg-gray-600 flex items-center justify-center cursor-pointer`,
  icon: `h-5 w-5`,
};

const Navbar = ({ toggleUsers }) => {
  const [user] = useAuthState(auth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={style.nav}>
      {user ? (
        <div className={style.userContainer}>
          <User />
        </div>
      ) : (
        <div></div> // Порожній елемент для збереження структури, коли користувач не авторизований
      )}

      <h1 className={style.heading}>Chat App</h1>

      <div className={style.actionButtons}>
        {user ? (
          <>
            {isMobile ? (
              <button
                className={style.userIcon}
                onClick={toggleUsers}
                aria-label="Показати список користувачів"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={style.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </button>
            ) : null}
            <LogOut />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
};

export default Navbar;
