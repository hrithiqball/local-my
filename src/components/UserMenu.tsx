import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { HEADERS, REQUEST_URL } from '@/lib/constants'
import { getUserIdFromToken } from '@/lib/jwt'
import { useTheme } from '@/provider/theme-provider'
import { useAuthStore } from '@/store/authStore'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserDropdown from './nav/UserDropdown'

export default function UserMenu() {
  const { setTheme } = useTheme()
  const token = useAuthStore.use.token()
  const user = useAuthStore.use.user()
  const setUser = useAuthStore.use.setUser()

  const userId = token ? getUserIdFromToken(token) : null

  useEffect(() => {
    if (!token || user) return

    async function getUser(userId: string) {
      try {
        const response = await fetch(`${REQUEST_URL}/user/${userId}`, {
          method: 'GET',
          headers: HEADERS
        })

        const data = await response.json()
        if (response.ok && data) {
          setUser(data)
        } else {
          throw new Error('An unknown error occurred. Please try again.')
        }
      } catch (error) {
        throw error
      }
    }

    if (userId) getUser(userId)
  }, [token, user])

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
