import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '@/api/user'
import Error from '@/pages/error-page'
import Loading from '@/pages/loading-page'

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
