import { Loader2 } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'

type LoadingPageProps = {
  message?: string
  lazy?: boolean
}

export default function LoadingPage({ message, lazy }: LoadingPageProps) {
  return lazy ? (
    <div className="flex h-screen w-full flex-col justify-center">
      <div className="flex justify-between p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <Skeleton className="size-6" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="size-12 rounded-full" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
        <span className="text-center">{message}</span>
      </div>
    </div>
  )
}
