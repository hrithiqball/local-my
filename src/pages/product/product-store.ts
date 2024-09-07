import { create } from 'zustand'
import { Product } from '@/types/product'

type ProductState = {
  product: Product | null
  setProduct: (product: Product | null) => void
}

export const useProductStore = create<ProductState>(set => ({
  product: null,
  setProduct: product => set({ product })
}))
