import { auth } from '../firebase'

const style = {
  button: `bg-gray-200 hover:bg-gray-100 py-2 px-4 rounded border border-white-400`,
}

const SignOutButton = () => {
  const signOut = () => {
    auth.signOut()
  }

  return (
    <button onClick={signOut} className={style.button}>
      LogOut
    </button>
  )
}

export default SignOutButton
