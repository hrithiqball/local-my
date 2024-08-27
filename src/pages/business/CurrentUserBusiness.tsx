import { getCurrentUserBusiness } from '@/api/business'
import { Button } from '@/components/ui/button'
import Header from '@/components/ui/header'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import Loading from '@/pages/LoadingPage'
import Error from '@/pages/ErrorPage'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Business } from '@/types/business'

export default function CurrentUserBusinessPage() {
  const { userId } = useParams()

  if (!userId) return <Navigate to="/" replace />

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-business', userId],
    queryFn: () => getCurrentUserBusiness(userId)
  })

  if (isLoading) return <Loading />
  if (isError || !data) return <Error />

  return (
    <div className="flex flex-col space-y-4">
      <Header
        title="My Business"
        description="Manage your business and shit"
        action={
          <Button variant="fill" className="space-x-1 bg-green-500">
            <Plus className="size-4" />
            <span>Register Business</span>
          </Button>
        }
      />
      <div className="p-4">
        {data?.map((business: Business) => (
          <Card key={business.id}>
            <CardHeader>
              <CardTitle>{business.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}

        {data.length === 0 && <div className="">No business found</div>}
      </div>
    </div>
  )
}
