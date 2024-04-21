import { useState, ChangeEvent } from 'react'
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  handleAuthError,
} from '../../utils/firebase/firebase.utils'
import { AuthError, UserCredential } from 'firebase/auth'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const [loading, setLoading] = useState(false)
  const { displayName, email, password, confirmPassword } = formFields

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    try {
      setLoading(true)
      createAuthUserWithEmailAndPassword(email, password)
        .then((response: UserCredential | undefined) => {
          if (!response) {
            console.error('No response from firebase')
            return
          }
          createUserDocumentFromAuth({ ...response.user, displayName })
            .then(() => setFormFields(defaultFormFields))
            .catch((error: AuthError) => {
              console.error(error)
              handleAuthError(error)
            })
            .finally(() => setLoading(false))
        })
        .catch((error: AuthError) => {
          console.error(error)
          handleAuthError(error)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className='sign-up-container'>
      <h2 className='title'>{`Don't have an account?`}</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          required
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
