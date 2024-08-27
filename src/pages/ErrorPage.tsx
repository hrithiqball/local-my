type ErrorPageProps = {
  message?: string
}

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <span className="text-center">{message}</span>
      </div>
    </div>
  )
}
