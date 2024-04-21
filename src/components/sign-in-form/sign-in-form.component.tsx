import { useState, ChangeEvent } from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  handleAuthError,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
import { AuthError } from 'firebase/auth'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const [loading, setLoading] = useState(false)
  const { email, password } = formFields

  const signInWithGoogle = () => {
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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setLoading(true)
      signInAuthUserWithEmailAndPassword(email, password)
        .then((response) => {
          console.log({ response })
          console.log('User signed in')
          setFormFields(defaultFormFields)
        })
        .catch((error: AuthError) => {
          console.error(error)
          handleAuthError(error)
        })
        .finally(() => setLoading(false))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-in-container'>
      <h2 className='title'>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          name='email'
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          required
          onChange={handleChange}
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit' disabled={loading} onClick={handleSubmit}>
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
