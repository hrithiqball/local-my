import { Product } from '@/types/product'
import { useProductStore } from '../../../../store/product-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

type ActionsProductCellProps = {
  product: Product
}

export default function ActionsProductCell({ product }: ActionsProductCellProps) {
  const { toggleDeleteDialog } = useProductStore()

  function handleSelectDelete() {
    toggleDeleteDialog(product.id)
  }

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
            Copy Product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`/product/edit/${product.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleSelectDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
