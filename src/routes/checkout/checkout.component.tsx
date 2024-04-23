import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map(
          (header) => (
            <div key={header} className='header-block'>
              <span>{header}</span>
            </div>
          )
        )}
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} item={item} />
      })}
      <span className='total'>
        Total: $
        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
      </span>
    </div>
  )
}

export default Checkout
