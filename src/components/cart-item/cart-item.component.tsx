import { CartItemInterface } from '../../utils/types/cart-item'
import './cart-item.styles.scss'

interface CartItemProps {
  cartItem: CartItemInterface
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, price, imageUrl } = cartItem
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  )
}

export default CartItem
