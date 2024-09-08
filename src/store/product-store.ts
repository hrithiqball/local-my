import { create } from 'zustand'

import { Product } from '@/types/product'

type ProductState = {
  product: Product | null
  setProduct: (product: Product | null) => void

  productIdDelete: string | null
  openDeleteDialog: boolean
  toggleDeleteDialog: (productId?: string) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  product: null,
  setProduct: product => set({ product }),

  productIdDelete: null,
  openDeleteDialog: false,
  toggleDeleteDialog: (productId?: string) => {
    const currentOpenState = get().openDeleteDialog
    if (!currentOpenState) {
      set({ productIdDelete: productId })
    }
    set({ openDeleteDialog: !currentOpenState })
    if (!productId) {
      set({ productIdDelete: null })
    }
  }
}))
