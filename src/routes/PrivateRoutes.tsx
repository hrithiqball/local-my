import { useAuthStore } from '@/store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes(): JSX.Element {
  const token = useAuthStore.use.token()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
