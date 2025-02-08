import GoogleButton from 'react-google-button'
import { googleSignIn } from '../auth/googleProvider'

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
