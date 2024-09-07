import { getProduct } from '@/api/product'
import { BASE_API_URL } from '@/lib/constants'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import BaseDetails from '@/pages/product/components/base-details'
import BusinessDetails from '@/pages/product/components/business-detail'
import DetailTable from '@/pages/product/components/detail-table'
import ProductReviews from '@/pages/product/components/product-reviews'
import SimilarProducts from '@/pages/product/components/similar-products'
import { useProductStore } from '@/pages/product/product-store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { id } = useParams()
  const { setProduct } = useProductStore()

  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id ?? ''),
    enabled: Boolean(id)
  })

  useEffect(() => {
    if (product) {
      setProduct(product)
    }

    return () => {
      setProduct(null)
    }
  }, [setProduct, product])

  if (isLoading) return <LoadingPage />
  if (isError || !product)
    return <ErrorPage message={!product ? 'No data received' : error.message} />

  return (
    <div>
      <div className="my-4 flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          {product.featurePhoto && (
            <div className="h-96">
              <img
                src={`${BASE_API_URL}${product.featurePhoto}`}
                alt={product.description ?? 'Product photo'}
                className="size-full rounded-sm object-contain"
              />
            </div>
          )}
          <div className="flex min-w-96 flex-col space-y-4">
            <BaseDetails />
            <DetailTable />
          </div>
        </div>
        <div className="flex w-full items-start">
          <BusinessDetails />
        </div>
        <ProductReviews />
        <SimilarProducts />
      </div>
    </div>
  )
}
