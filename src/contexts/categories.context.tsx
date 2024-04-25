import { ReactNode, createContext, useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
import { CategoriesContextInterface } from '../utils/types/category'

export const CategoriesContext = createContext<CategoriesContextInterface>({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    getCategoriesAndDocuments()
      .then((data) => {
        setCategoriesMap(data)
      })
      .catch((error) => {
        console.error('Error getting categories and documents', error)
      })
    // setCategories(SHOP_DATA.find((item) => item.title === 'Mens')?.items ?? [])
  }, [])

  return (
    <CategoriesContext.Provider value={{ categoriesMap }}>
      {children}
    </CategoriesContext.Provider>
  )
}
