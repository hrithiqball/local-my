import { Star, StarHalf } from 'lucide-react'

type RatingProps = {
  rating: number
}

export default function Rating({ rating }: RatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5

  return (
    <div className="relative flex items-center">
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={`base-${index}`} className="size-5 text-gray-300" strokeWidth={1.5} />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center space-x-1">
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className="size-5 text-yellow-500"
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="size-5 text-yellow-500" fill="currentColor" strokeWidth={0} />
        )}
      </div>
    </div>
  )
}
