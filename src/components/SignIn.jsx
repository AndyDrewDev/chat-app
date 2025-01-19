import { auth } from '../firebase'
import {
  GoogleAuthProvider,
  //   signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth'
import GoogleButton from 'react-google-button'

const style = {
  wrapper: `flex justify-center`,
}
const googleSignIn = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

const SignIn = () => {
  return (
    <div className={style.wrapper}>
      <GoogleButton onClick={googleSignIn} />
    </div>
  )
}

export default SignIn
