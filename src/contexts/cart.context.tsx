import { ReactNode, createContext, useEffect, useState } from 'react'
import { Product } from '../utils/types/product'
import {
  CartContextInterface,
  CartItemInterface,
} from '../utils/types/cart-item'

const addCartItem = (cartItems: CartItemInterface[], product: Product) => {
  const match = cartItems.find((item) => item.id === product.id)
  if (match) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    )
  } else {
    return [...cartItems, { ...product, quantity: 1 }]
  }
}

const removeCartItem = (cartItems: CartItemInterface[], product: Product) => {
  const match = cartItems.find((item) => item.id === product.id)
  if (match && match.quantity > 1) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    )
  } else {
    return cartItems.filter((item) => item.id !== product.id)
  }
}

export const CartContext = createContext<CartContextInterface>({
  isCartOpen: false,
  setIsCartOpen: (_status: boolean) => {
    console.log(_status)
  },
  cartItems: [],
  cartItemsCount: 0,
  addItemToCart: (_product: Product) => {
    console.log(_product)
  },
  removeItemFromCart: (_product: Product) => {
    console.log(_product)
  },
  removeProductFromCart: (_product: Product) => {
    console.log(_product)
  },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([])
  const [cartItemsCount, setCartItemsCount] = useState(0)

  const addItemToCart = (product: Product) => {
    setCartItems(addCartItem(cartItems, product))
  }
  const removeItemFromCart = (product: Product) => {
    setCartItems(removeCartItem(cartItems, product))
  }
  const removeProductFromCart = (product: Product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id))
  }

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((sum, item) => item.quantity + sum, 0))
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    removeProductFromCart,
    cartItemsCount,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
