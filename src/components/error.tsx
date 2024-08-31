import { AlertCircle } from 'lucide-react'

type ErrorProps = {
  message?: string
}

export default function Error({ message = 'Something went wrong!' }: ErrorProps) {
  return (
    <div className="flex items-center space-x-2 p-4 text-red-500">
      <AlertCircle />
      <span className="font-bold">{message}</span>
    </div>
  )
}
