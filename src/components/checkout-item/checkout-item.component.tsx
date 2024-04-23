import { useContext } from 'react'
import { CheckoutItemProps } from '../../utils/types/cart-item'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const { addItemToCart, removeItemFromCart, removeProductFromCart } =
    useContext(CartContext)
  const { name, quantity, price, imageUrl } = item

  const handleRemoveProductFromCart = () => removeProductFromCart(item)

  const handleRemoveFromCart = () => removeItemFromCart(item)

  const handleAddToCart = () => addItemToCart(item)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveFromCart}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddToCart}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price} </span>
      <div className='remove-button' onClick={handleRemoveProductFromCart}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
