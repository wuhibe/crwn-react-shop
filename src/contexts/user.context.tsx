import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { User } from 'firebase/auth'
import {
  createUserDocumentFromAuth,
  onAuthStateChangedHandler,
} from '../utils/firebase/firebase.utils'

export const UserContext = createContext<{
  currentUser: User | null
  setCurrentUser: Dispatch<SetStateAction<User | null>>
}>({
  currentUser: null,
  setCurrentUser: (_user) => {
    console.log(_user)
  },
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
          .then(() => {
            // pass
          })
          .catch((error) => {
            console.error(error)
          })
      }
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
