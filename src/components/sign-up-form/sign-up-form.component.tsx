import { useState, ChangeEvent } from 'react'
import {
  createUserDocumentFromAuth,
  createUserWithEmailAndPasswordFromForm,
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
      createUserWithEmailAndPasswordFromForm(email, password)
        .then((response: UserCredential | undefined) => {
          if (!response) {
            console.error('No response from firebase')
            return
          }
          createUserDocumentFromAuth({ ...response.user, displayName })
            .then(() => setFormFields(defaultFormFields))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
        })
        .catch((error: AuthError) => {
          console.log(error)
          if (error.code == 'auth/email-already-in-use') {
            alert('The email address is already in use')
          } else if (error.code == 'auth/invalid-email') {
            alert('The email address is not valid.')
          } else if (error.code == 'auth/operation-not-allowed') {
            alert('Operation not allowed.')
          } else if (error.code == 'auth/weak-password') {
            alert('The password is too weak.')
          }
          console.error(error)
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
          id='displayName'
          name='displayName'
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          id='email'
          name='email'
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          id='password'
          name='password'
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          id='confirmPassword'
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
