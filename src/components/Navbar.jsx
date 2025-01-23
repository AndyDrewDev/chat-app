import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import User from './User'
import SignIn from './SignIn'
import LogOut from './SignOutButton'

const style = {
  nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl`,
  user: `flex items-center`,
  // buttonContainer: `flex items-center`,
}
const Navbar = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      <div className={style.nav}>
        <div>
          <h1 className={style.heading}>Chat App</h1>
        </div>
        <div className={style.user}>
          {user ? (
            <>
              <User />
              <LogOut />
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
