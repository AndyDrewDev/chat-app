import GoogleButton from 'react-google-button'
import { googleSignIn } from '../utils/auth'

const style = {
  wrapper: `flex justify-center`,
}

const SignIn = () => {
  return (
    <div className={style.wrapper}>
      <GoogleButton onClick={googleSignIn} />
    </div>
  )
}

export default SignIn
