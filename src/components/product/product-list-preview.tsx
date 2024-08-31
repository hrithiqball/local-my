import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'

type ProductListPreviewProps = {
  businessId: string
}

export default function ProductListPreview({ businessId }: ProductListPreviewProps) {
  const navigate = useNavigate()

  function handleNavigateCreateProduct() {
    navigate(`/product/create/${businessId}`)
  }

  return (
    <div className="flex flex-col space-y-4">
      <span className="font-semibold">Products</span>
      <div className="px-8">
        <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
          <CarouselContent>
            {/* TODO: use actual data */}
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col space-y-2 p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="">test</span>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col text-xs">
                    <span>RM 73</span>
                    <span>My product and shit</span>
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
