import BrandIcon from '@/components/BrandIcon'
import NavBar from '@/components/NavBar'
import UserMenu from '@/components/UserMenu'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-between p-4">
        <BrandIcon />
        <NavBar />
        <UserMenu />
      </div>

      <div className="flex-1 px-4">
        <Outlet />
      </div>
    </div>
  )
}
