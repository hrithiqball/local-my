import { Loader2 } from 'lucide-react'

export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
