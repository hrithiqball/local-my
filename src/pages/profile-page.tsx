import { getCurrentUser } from '@/api/user'
import Loading from '@/pages/loading-page'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import Error from '@/pages/error-page'

export default function ProfilePage() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getCurrentUser(id || '')
  })

  if (!id) return <Navigate to="/" replace />

  if (isLoading) return <Loading />
  if (isError || !data) return <Error />

  return (
    <div>
      <h1>Profile</h1>
      <p>User ID: {data.name}</p>
    </div>
  )
}
