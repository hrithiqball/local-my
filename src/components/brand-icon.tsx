import { Link } from 'react-router-dom'

export default function BrandIcon() {
  return (
    <Link className="flex items-center space-x-2" to="/">
      <img src="/src/assets/brand.svg" alt="local-my-icon" className="w-8" />
      <span className="font-semibold">Local MY</span>
    </Link>
  )
}
