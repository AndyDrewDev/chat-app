import { auth } from '../firebase'

const style = {
  button: `bg-gray-200 hover:bg-gray-100 py-2 px-4 rounded border border-white-400`,
}

const LogOut = () => {
  const signOut = () => {
    signOut(auth)
  }

  return (
    <button onClick={() => auth.signOut()} className={style.button}>
      LogOut
    </button>
  )
}

export default LogOut
