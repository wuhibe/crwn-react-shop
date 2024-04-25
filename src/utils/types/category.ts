import { Product } from './product'

export type CategoryMap = Record<string, Product[]>

export interface CategoriesContextInterface {
  categoriesMap: CategoryMap
}

export interface CategoryPreviewProps {
  title: string
  products: Product[]
}
