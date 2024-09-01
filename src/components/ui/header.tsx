type HeaderProps = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function Header({ title, description, action }: HeaderProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-5xl flex-1 rounded-xl border bg-card p-4 text-card-foreground shadow">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          {action}
        </div>
      </div>
    </div>
  )
}
