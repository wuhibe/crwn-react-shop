import { useContext } from 'react'
import shoppingIcon from '../../assets/shopping-bag.svg'
import { CartContext } from '../../contexts/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  return (
    <div
      className='cart-icon-container'
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      <img src={shoppingIcon} className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  )
}
export default CartIcon
