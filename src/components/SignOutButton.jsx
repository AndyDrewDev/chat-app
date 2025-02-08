import { auth } from "../firebase";

const style = {
  button: `border-white-400 rounded border bg-gray-200 px-4 py-2 hover:bg-gray-100`,
};

const SignOutButton = () => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <button onClick={signOut} className={style.button}>
      LogOut
    </button>
  );
};

export default SignOutButton;
