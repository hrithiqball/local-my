import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getBusiness } from '@/api/business'
import { deleteProduct } from '@/api/product'
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
import Header from '@/components/ui/header'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import { columns } from '@/pages/product/components/product-table/columns'
import ProductTable from '@/pages/product/components/product-table/table'
import { useProductStore } from '@/store/product-store'

export default function BusinessPage() {
  const { businessId } = useParams()
  const queryClient = useQueryClient()
  const { openDeleteDialog, productIdDelete, toggleDeleteDialog } = useProductStore()

  const {
    data: business,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['business', businessId],
    queryFn: () => getBusiness(businessId || '')
  })

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business', businessId] })
      toast.success('Product deleted successfully')
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message)
        return
      }

      toast.error('An unknown error occurred. Please try again.')
    }
  })

  if (isLoading) return <LoadingPage />
  if (isError || !business)
    return <ErrorPage message={!business ? 'No data received' : error.message} />

  function handleDeleteProduct() {
    if (!productIdDelete) {
      toast.error('Product ID not found')
      return
    }
    deleteProductMutation.mutate(productIdDelete)
  }

  return (
    <div>
      <Header
        title={business.name}
        description="No description for now"
        action={
          <Button variant="fill" asChild>
            <Link to={`/product/create/${businessId}`}>Add Product</Link>
          </Button>
        }
      />
      {business.products?.length ? (
        <div className="p-4">
          <ProductTable data={business.products} columns={columns} />
        </div>
      ) : (
        <div>No products found</div>
      )}
      <AlertDialog open={openDeleteDialog} onOpenChange={() => toggleDeleteDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          {productIdDelete}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
