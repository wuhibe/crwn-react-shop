import { useState, ChangeEvent } from 'react'
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  handleAuthError,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

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
      .then(() => {
        // pass
      })
      .catch(handleAuthError)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    signInAuthUserWithEmailAndPassword(email, password)
      .then(() => {
        setFormFields(defaultFormFields)
      })
      .catch(handleAuthError)
      .finally(() => setLoading(false))
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
