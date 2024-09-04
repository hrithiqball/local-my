import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <img src="/src/assets/404.svg" alt="notfound" className="w-40" />
        <span className="rounded-sm bg-red-950 p-2 font-semibold">
          Page not found or no longer exists!
        </span>
        <Button asChild>
          <Link to="/">Go To Home Page</Link>
        </Button>
      </div>
    </div>
  )
}
