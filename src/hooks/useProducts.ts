import { ProductContext } from 'contexts/ProductsContext'
import { useContext } from 'react'

export function useProducts() {
  return useContext(ProductContext)
}