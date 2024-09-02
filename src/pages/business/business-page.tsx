import { getBusiness } from '@/api/business'
import { columns } from '@/components/product/product-table/columns'
import ProductTable from '@/components/product/product-table/table'
import { Button } from '@/components/ui/button'
import Header from '@/components/ui/header'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

export default function BusinessPage() {
  const { businessId } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['business', businessId],
    queryFn: () => getBusiness(businessId || '')
  })

  if (isLoading) return <LoadingPage />
  if (isError || !data) return <ErrorPage message={!data ? 'No data received' : error.message} />

  return (
    <div>
      <Header
        title={data.name}
        description="No description for now"
        action={
          <Button variant="fill" asChild>
            <Link to={`/product/create/${businessId}`}>Add Product</Link>
          </Button>
        }
      />
      {data.products?.length ? (
        <div className="p-4">
          <ProductTable data={data.products} columns={columns} />
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  )
}
