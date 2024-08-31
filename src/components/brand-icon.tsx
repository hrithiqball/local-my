import { CodeIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

export default function BrandIcon() {
  return (
    <Link className="flex items-center space-x-2" to="/">
      <CodeIcon />
      <span>Local MY</span>
    </Link>
  )
}
