import { AlertCircle } from 'lucide-react'

type ErrorComponentProps = {
  message?: string
}

export default function ErrorComponent({ message = 'Something went wrong!' }: ErrorComponentProps) {
  return (
    <div className="flex items-center space-x-2 p-4 text-red-500">
      <AlertCircle />
      <span className="font-bold">{message}</span>
    </div>
  )
}
