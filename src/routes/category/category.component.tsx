import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'

import { Product } from '../../utils/types/product'
import './category.styles.scss'

const Category = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  const { category } = useParams()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (category) setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <h2 className='category-title'>{category?.toUpperCase()}</h2>
      <div className='category-container'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Category
