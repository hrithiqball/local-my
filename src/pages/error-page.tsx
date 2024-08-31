import { AlertCircle } from 'lucide-react'

type ErrorPageProps = {
  message?: string
}

export default function ErrorPage({ message = 'Something went wrong!' }: ErrorPageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center justify-center space-x-4 text-red-500">
        <AlertCircle />
        <span className="text-center">{message}</span>
      </div>
    </div>
  )
}
