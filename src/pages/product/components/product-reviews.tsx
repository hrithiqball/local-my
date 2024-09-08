import { useState } from 'react'
import { ChevronLeft, ChevronRight, User2 } from 'lucide-react'

import Rating from '@/components/rating'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const dummyUserReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Great product',
    media: null,
    user: { name: 'John', profilePhoto: null }
  },
  {
    id: '2',
    rating: 4,
    comment: 'Good product',
    media: null,
    user: { name: 'Jane', profilePhoto: null }
  },
  {
    id: '3',
    rating: 3,
    comment: 'Average product',
    media: null,
    user: { name: 'Doe', profilePhoto: null }
  },
  {
    id: '4',
    rating: 2,
    comment: 'Bad product',
    media: null,
    user: { name: 'Aiman', profilePhoto: null }
  },
  {
    id: '5',
    rating: 1,
    comment: 'Worst product',
    media: null,
    user: { name: 'Nisa', profilePhoto: null }
  },
  {
    id: '6',
    rating: 5,
    comment: 'Great product',
    media: null,
    user: { name: 'Anis', profilePhoto: null }
  },
  {
    id: '7',
    rating: 4,
    comment: 'Good product',
    media: null,
    user: { name: 'Nisa', profilePhoto: null }
  },
  {
    id: '8',
    rating: 3,
    comment: 'Average product',
    media: null,
    user: { name: 'Iman', profilePhoto: null }
  },
  {
    id: '9',
    rating: 2,
    comment: 'Bad product',
    media: null,
    user: { name: 'Rokiah', profilePhoto: null }
  },
  {
    id: '10',
    rating: 1,
    comment: 'Worst product',
    media: null,
    user: { name: 'Doe', profilePhoto: null }
  },
  {
    id: '11',
    rating: 5,
    comment: 'Great product',
    media: null,
    user: { name: 'John', profilePhoto: null }
  }
]

const ITEMS_PER_PAGE = 5

export default function ProductReviews() {
  const [ratingFilter, setRatingFilter] = useState('all')
  // use search params to filter the reviews
  const [currentPage, setCurrentPage] = useState(1)

  const filteredReviews = dummyUserReviews.filter(review => {
    if (ratingFilter === 'all') return true
    if (ratingFilter === 'comment') return review.comment !== ''
    if (ratingFilter === 'media') return review.media !== null
    return review.rating.toString() === ratingFilter
  })

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentReviews = filteredReviews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-semibold">Product Ratings</h1>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setRatingFilter('all')}
            variant={ratingFilter === 'all' ? 'fill' : 'default'}
          >
            All
          </Button>
          <Button
            onClick={() => setRatingFilter('5')}
            variant={ratingFilter === '5' ? 'fill' : 'default'}
          >
            5 star
          </Button>
          <Button
            onClick={() => setRatingFilter('4')}
            variant={ratingFilter === '4' ? 'fill' : 'default'}
          >
            4 star
          </Button>
          <Button
            onClick={() => setRatingFilter('3')}
            variant={ratingFilter === '3' ? 'fill' : 'default'}
          >
            3 star
          </Button>
          <Button
            onClick={() => setRatingFilter('2')}
            variant={ratingFilter === '2' ? 'fill' : 'default'}
          >
            2 star
          </Button>
          <Button
            onClick={() => setRatingFilter('1')}
            variant={ratingFilter === '1' ? 'fill' : 'default'}
          >
            1 star
          </Button>
          <Button
            onClick={() => setRatingFilter('comment')}
            variant={ratingFilter === 'comment' ? 'fill' : 'default'}
          >
            With Comments
          </Button>
          <Button
            onClick={() => setRatingFilter('media')}
            variant={ratingFilter === 'media' ? 'fill' : 'default'}
          >
            With Media
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col space-y-4 py-4">
          {currentReviews.map(review => (
            <Card className="flex" key={review.id}>
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex size-8 items-center justify-center rounded-full bg-gray-400">
                  <User2 className="size-4 text-white" />
                </div>
                <span>{review.user.name}</span>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col p-4">
                  <Rating rating={review.rating} />
                  <span>{review.comment}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size="icon"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? 'fill' : 'default'}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            size="icon"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
