import { useContext } from 'react'
import shoppingIcon from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(CartContext)
  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className='cart-icon-container' onClick={toggleCartOpen}>
      <img src={shoppingIcon} className='shopping-icon' />
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  )
}
export default CartIcon
