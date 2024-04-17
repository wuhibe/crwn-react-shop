import {Fragment} from 'react/jsx-runtime'
import {Link, Outlet} from 'react-router-dom'
import crwnLogo from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
