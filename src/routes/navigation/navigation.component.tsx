import { useContext } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Link, Outlet } from 'react-router-dom'
import crwnLogo from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { signOutAuthUser } from '../../utils/firebase/firebase.utils'
import './navigation.styles.scss'

const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  const signOutHandler = () => {
    signOutAuthUser()
      .then(() => {
        // pass
      })
      .catch((error) => console.error(error))
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <img src={crwnLogo} className='logo' />
        </Link>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
