import { ReactNode, createContext, useState, useEffect } from 'react'
import SHOP_DATA from '../shop-data.json'
import { Product, ProductContextInterface } from '../utils/types/product'

export const ProductsContext = createContext<ProductContextInterface>({
  products: [],
})

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setProducts(SHOP_DATA)
  }, [])

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
}
