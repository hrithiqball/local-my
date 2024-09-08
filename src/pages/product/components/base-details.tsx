import Rating from '@/components/rating'
import { useProductStore } from '@/store/product-store'

const dummyRating = 4.5
const dummyReviews = 23

export default function BaseDetails() {
  const { product } = useProductStore()

  return (
    product && (
      <>
        <h1 className="text-3xl font-semibold leading-loose">{product.name}</h1>
        <div className="flex">
          <span className="rounded-full bg-purple-400 px-2 text-xs font-semibold text-white">
            {product.type}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-600 underline underline-offset-4 dark:text-yellow-300">
            {dummyRating}
          </span>
          <Rating rating={dummyRating} />
          <span className="px-2">|</span>
          <div className="space-x-1">
            <span className="underline underline-offset-4">{dummyReviews}</span>
            <span>Reviews</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-orange-500 dark:text-orange-600">
            RM{product.price} - RM{product.price + 2.4}
          </h3>
          <div className="flex">
            <span className="rounded-sm bg-red-400 px-1 text-xs font-semibold text-white">
              20% OFF
            </span>
          </div>
        </div>
      </>
    )
  )
}
