type HeaderProps = {
  title: string
  description?: string
  action: React.ReactNode
}

export default function Header({ title, description, action }: HeaderProps) {
  return (
    <div className="rounded-xl border bg-card p-4 text-card-foreground shadow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        {action}
      </div>
    </div>
  )
}
