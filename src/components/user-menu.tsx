import { getCurrentUser } from '@/api/user'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getUserIdFromToken } from '@/lib/jwt'
import { useTheme } from '@/provider/theme-provider'
import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserDropdown from './nav/user-dropdown'

export default function UserMenu() {
  const { setTheme } = useTheme()
  const token = useAuthStore.use.token()
  const user = useAuthStore.use.user()
  const setUser = useAuthStore.use.setUser()

  const userId = token ? getUserIdFromToken(token) : null

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => (userId ? getCurrentUser(userId) : Promise.reject('No user ID')),
    enabled: Boolean(userId)
  })

  useEffect(() => {
    if (data && !user) {
      setUser(data)
    }
  }, [data, user, setUser])

  if (isLoading) return <Loader2 className="size-4 animate-spin" />
  if (isError || !data) return <div>Error getting user</div>

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <>
          <Button variant="link" asChild>
            <Link to="/register">Register</Link>
          </Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </>
      )}
    </div>
  )
}
