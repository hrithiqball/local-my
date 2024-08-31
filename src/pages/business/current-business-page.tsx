import { getCurrentUserBusiness } from '@/api/business'
import BusinessDetailsView from '@/components/business/business-details-view'
import CreateBusinessForm from '@/components/business/create-business-form'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/header'
import { SheetDrawer } from '@/components/ui/sheet-drawer'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import { Business } from '@/types/business'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export default function CurrentUserBusinessPage() {
  const { userId } = useParams()

  if (!userId) return <Navigate to="/" replace />

  const [openCreateBusiness, setOpenCreateBusiness] = useState(false)
  const [openBusinessDetails, setOpenBusinessDetails] = useState(false)
  const [businessId, setBusinessId] = useState<string | null>(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user-business', userId],
    queryFn: () => getCurrentUserBusiness(userId)
  })

  function handleOpenCreateBusiness() {
    setOpenCreateBusiness(true)
  }

  function handleCloseCreateBusiness() {
    setOpenCreateBusiness(false)
  }

  function handleOpenBusinessDetails(businessId: string) {
    setBusinessId(businessId)
    setOpenBusinessDetails(true)
  }

  function handleCloseBusinessDetails() {
    setOpenBusinessDetails(false)
    setBusinessId(null)
  }

  if (isLoading) return <LoadingPage />
  if (isError || !data) return <ErrorPage message={error?.message} />

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
      <div className="space-y-4 p-4">
        {data?.map((business: Business) => (
          <Card
            className="cursor-pointer"
            key={business.id}
            onClick={() => handleOpenBusinessDetails(business.id)}
          >
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
      <SheetDrawer
        open={openBusinessDetails}
        onClose={handleCloseBusinessDetails}
        title="Business Details"
      >
        <BusinessDetailsView businessId={businessId} />
      </SheetDrawer>
    </div>
  )
}
