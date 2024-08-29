import { getCurrentUserBusiness } from '@/api/business'
import CreateBusinessForm from '@/components/business/create-business-form'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/header'
import { SheetDrawer } from '@/components/ui/sheet-drawer'
import Error from '@/pages/error-page'
import Loading from '@/pages/loading-page'
import { Business } from '@/types/business'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export default function CurrentUserBusinessPage() {
  const { userId } = useParams()

  if (!userId) return <Navigate to="/" replace />

  const [openCreateBusiness, setOpenCreateBusiness] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-business', userId],
    queryFn: () => getCurrentUserBusiness(userId)
  })

  function handleOpenCreateBusiness() {
    setOpenCreateBusiness(true)
  }

  function handleCloseCreateBusiness() {
    setOpenCreateBusiness(false)
  }

  if (isLoading) return <Loading />
  if (isError || !data) return <Error />

  return (
    <div className="flex flex-col space-y-4">
      <Header
        title="My Business"
        description="Manage your business and shit"
        action={
          <Button variant="fill" className="space-x-1" onClick={handleOpenCreateBusiness}>
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

        {data.length === 0 && <div className="">No business found. Time to make money?</div>}
      </div>
      <SheetDrawer
        open={openCreateBusiness}
        onClose={handleCloseCreateBusiness}
        title="Create Business"
        footer={
          <Button form="create-business-form" variant="fill" type="submit">
            Create Business
          </Button>
        }
      >
        <CreateBusinessForm formId="create-business-form" />
      </SheetDrawer>
    </div>
  )
}
