import BrandIcon from '@/components/brand-icon'
import NavBar from '@/components/nav-bar'
import UserMenu from '@/components/user-menu'
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
