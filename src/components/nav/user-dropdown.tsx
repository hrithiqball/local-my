import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth-store'
import { User } from '@/types/user'
import { User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type UserDropdownProps = {
  user: User
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const navigate = useNavigate()
  const clearToken = useAuthStore.use.clearToken()

  function handleRedirectProfile() {
    navigate(`/profile/${user.id}`)
  }

  function handleRedirectSettings() {
    navigate(`/profile/settings/${user.id}`)
  }

  function handleRedirectBusiness() {
    navigate(`/business/user/${user.id}`)
  }

  function handleLogout() {
    clearToken()
    navigate('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="space-x-1">
          <User2 className="size-4" />
          <span>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleRedirectProfile}>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleRedirectSettings}>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleRedirectBusiness}>Business</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
