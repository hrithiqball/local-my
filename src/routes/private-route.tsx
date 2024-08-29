import { useAuthStore } from '@/store/auth-store'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes(): JSX.Element {
  const token = useAuthStore.use.token()

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
