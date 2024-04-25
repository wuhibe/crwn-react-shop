import { useContext } from 'react'
import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {
  const value = useContext(CategoriesContext)
  const { categoriesMap } = value

  return (
    <>
      {Object.keys(categoriesMap).map((category) => (
        <CategoryPreview
          key={category}
          title={category}
          products={categoriesMap[category]}
        />
      ))}
    </>
  )
}

export default CategoriesPreview
