import { auth } from '../firebase'

const style = {
  wrapper: `flex flex-row  items-center `,
  userPhoto: `color-white rounded-full h-10 w-10 mx-6 border-[1.5px] border-white-400`,
  userName: `text-md text-white font-bold ml-12`,
}

const User = () => {
  const photoURL = auth.currentUser.photoURL

  return (
    <div className={style.wrapper}>
      <span className={style.userName}>{auth.currentUser.displayName}</span>
      <img className={style.userPhoto} src={photoURL} alt='user-photo' />
    </div>
  )
}

export default User
