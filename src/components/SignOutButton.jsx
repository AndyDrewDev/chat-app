import { auth } from "../firebase";

const style = {
  button: `rounded-full bg-gray-700 p-2 text-white hover:bg-gray-600 flex items-center justify-center`,
  icon: `h-5 w-5`,
};

const SignOutButton = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <button onClick={signOut} className={style.button} aria-label="Вийти">
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
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </button>
  );
};

export default SignOutButton;
