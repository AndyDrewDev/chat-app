import { auth } from "../firebase";

const style = {
  wrapper: `flex items-center justify-center`,
  userPhoto: `ml-1 h-9 w-9 md:h-10 md:w-10 rounded-full border-2 border-white`,
  photoPlaceholder: `ml-1 h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 text-xs md:text-sm border-2 border-white`,
};

const User = () => {
  const { photoURL, displayName } = auth.currentUser;
  const initial = displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className={style.wrapper}>
      {photoURL ? (
        <img
          className={style.userPhoto}
          src={photoURL}
          alt={`${displayName} photo`}
        />
      ) : (
        <div className={style.photoPlaceholder}>{initial}</div>
      )}
    </div>
  );
};

export default User;
