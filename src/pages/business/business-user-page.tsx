import { deleteBusiness, getCurrentUserBusiness } from '@/api/business'
import BusinessDetailsView from '@/components/business/business-details-view'
import CreateBusinessForm from '@/components/business/create-business-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/ui/header'
import { Input } from '@/components/ui/input'
import { SheetDrawer } from '@/components/ui/sheet-drawer'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import { Business } from '@/types/business'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PanelRight, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function BusinessUserPage() {
  const { userId } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [openCreateBusiness, setOpenCreateBusiness] = useState(false)
  const [openBusinessDetails, setOpenBusinessDetails] = useState(false)
  const [openDeleteBusinessConfirmation, setOpenDeleteBusinessConfirmation] = useState(false)
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [businessDeleteName, setBusinessDeleteName] = useState<string | null>(null)
  const [deleteInputConfirmation, setDeleteInputConfirmation] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user-business', userId],
    queryFn: () => getCurrentUserBusiness(userId || '')
  })

  const deleteBusinessMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-business', userId] })
      toast.success('Business deleted successfully')
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message)
        return
      }

      toast.error('An unknown error occurred. Please try again.')
    }
  })

  if (!userId) return <Navigate to="/" replace />

  function handleOpenBusinessDetails(businessId: string) {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setBusinessId(businessId)
      setOpenBusinessDetails(true)
    }
  }

  function handleCloseBusinessDetails() {
    setOpenBusinessDetails(false)
  }

  function handleOpenBusinessDeletionConfirmation(businessName: string, businessId: string) {
    return function (event: React.MouseEvent<HTMLButtonElement>) {
      event.stopPropagation()
      setBusinessId(businessId)
      setBusinessDeleteName(businessName)
      setOpenDeleteBusinessConfirmation(true)
    }
  }

  function handleNavigateToBusiness(businessId: string) {
    return () => {
      navigate('/business/' + businessId)
    }
  }

  function handleCloseBusinessDeletionConfirmation() {
    setOpenDeleteBusinessConfirmation(false)
    setBusinessDeleteName(null)
  }

  function handleDeleteBusiness() {
    if (!businessId) {
      toast.error('Business ID not found')
      return
    }

    deleteBusinessMutation.mutate(businessId)
  }

  if (isLoading) return <LoadingPage />
  if (isError || !data) return <ErrorPage message={error?.message} />

  return (
    <div className="flex flex-col space-y-4">
      <Header
        title="My Business"
        description="Manage your business and shit"
        action={
          <Button variant="fill" className="space-x-1" onClick={() => setOpenCreateBusiness(true)}>
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
            onClick={handleNavigateToBusiness(business.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{business.name}</span>
                  <span className="text-sm text-gray-500">Description is not here yet</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    onClick={handleOpenBusinessDetails(business.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <PanelRight className="size-4" />
                  </Button>
                  <Button
                    onClick={handleOpenBusinessDeletionConfirmation(business.name, business.id)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="size-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}

        {data.length === 0 && <div className="">No business found. Time to make money?</div>}
      </div>

      <SheetDrawer
        open={openCreateBusiness}
        onClose={() => setOpenCreateBusiness(false)}
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
      <AlertDialog
        open={openDeleteBusinessConfirmation}
        onOpenChange={handleCloseBusinessDeletionConfirmation}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this business?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder={`Type \`DELETE ${businessDeleteName}\` to confirm`}
            value={deleteInputConfirmation}
            onChange={e => setDeleteInputConfirmation(e.target.value)}
            onPaste={e => e.preventDefault()}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBusiness}
              disabled={deleteInputConfirmation !== `DELETE ${businessDeleteName}`}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
