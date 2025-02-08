import { auth } from "../firebase";

const style = {
  wrapper: `flex flex-row  items-center `,
  userPhoto: `color-white border-white-400 mx-6 h-10 w-10 rounded-full border-[1.5px]`,
  userName: `text-md ml-12 font-bold text-white`,
};

const User = () => {
  const photoURL = auth.currentUser.photoURL;

  return (
    <div className={style.wrapper}>
      <span className={style.userName}>{auth.currentUser.displayName}</span>
      <img className={style.userPhoto} src={photoURL} alt="user-photo" />
    </div>
  );
};

export default User;
