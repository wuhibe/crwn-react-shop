import './sign-in.styles.scss'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  const logGoogleUser = () => {
    signInWithGooglePopup()
      .then((response) => {
        console.log(response)
        createUserDocumentFromAuth(response.user)
          .then(() => {
            console.log('User document created')
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => logGoogleUser()}>Sign in with Google</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
