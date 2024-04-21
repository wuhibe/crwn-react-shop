import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYNga9meTq5YXKcIrCHmGZt0Zcszjlu7o',
  authDomain: 'crwn-clothing-db-9ae7c.firebaseapp.com',
  projectId: 'crwn-clothing-db-9ae7c',
  storageBucket: 'crwn-clothing-db-9ae7c.appspot.com',
  messagingSenderId: '384794891908',
  appId: '1:384794891908:web:e11a5b6cf5a8759b75d4d1',
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userDocSnapshot = await getDoc(userDocRef)
  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.error('Error creating user', error)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    console.error('Email and password are required')
    return
  }
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    console.error('Email and password are required')
    return
  }
  return signInWithEmailAndPassword(auth, email, password)
}

export const handleAuthError = (error: AuthError) => {
  const errorMessage = error.message
  alert(errorMessage.split(':')[1])
}