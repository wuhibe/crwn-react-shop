import { Product } from './product'

export interface CartItemInterface extends Product {
  quantity: number
}

export interface CartContextInterface {
  isCartOpen: boolean
  setIsCartOpen: (status: boolean) => void
  cartItems: CartItemInterface[]
  cartItemsCount: number
  addItemToCart: (product: Product) => void
  removeItemFromCart: (product: Product) => void
  removeProductFromCart: (product: Product) => void
}

export interface CheckoutItemProps {
  item: CartItemInterface
}
