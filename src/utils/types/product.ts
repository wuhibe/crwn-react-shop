export interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
}

export interface ProductCardProps {
  product: Product
}

export interface ProductContextInterface {
  products: Product[]
}
