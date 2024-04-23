import { ReactNode, createContext, useState } from 'react'

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (_status: boolean) => {
    console.log(_status)
  },
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const value = { isCartOpen, setIsCartOpen }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
