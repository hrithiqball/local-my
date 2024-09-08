import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { getProductList } from '@/api/product'
import ErrorComponent from '@/components/error'
import { Image } from '@/components/image'
import LoadingComponent from '@/components/loading'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ProductFilter } from '@/types/product'

type ProductListPreviewProps = {
  businessId: string
}

export default function ProductListPreview({ businessId }: ProductListPreviewProps) {
  const navigate = useNavigate()
  const filter = new ProductFilter()
  filter.businessId = businessId

  const {
    data: productList,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products', 'business', businessId],
    queryFn: () => getProductList(filter)
  })

  if (isLoading) return <LoadingComponent />
  if (isError) return <ErrorComponent message={error.message} />

  function handleNavigateCreateProduct() {
    navigate(`/product/create/${businessId}`)
  }

  return (
    <div className="flex flex-col space-y-4">
      <span className="font-semibold">Products</span>
      <div className="px-8">
        <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
          <CarouselContent>
            {productList?.productList.map(product => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col space-y-2 p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-1">
                      {product.featurePhoto ? (
                        <Image className="size-full" src={product.featurePhoto} alt="" />
                      ) : (
                        <span className="text-3xl font-semibold">No photo</span>
                      )}
                    </CardContent>
                  </Card>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{product.name}</span>
                    <span className="text-xs">RM {product.price}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card onClick={handleNavigateCreateProduct} className="cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">
                      <Plus className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
