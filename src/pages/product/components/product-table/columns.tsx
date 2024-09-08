import { Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ActionsProductCell from '@/pages/product/components/product-table/actions-product-cell'
import { Product } from '@/types/product'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const product = row.original

      return (
        <Link
          className="underline-offset-4 hover:text-blue-500 hover:underline"
          to={`/product/${product.id}`}
        >
          {product.name}
        </Link>
      )
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center space-x-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>Price</span>
          <ArrowUpDown className="size-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center space-x-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <span>Stock</span>
          <ArrowUpDown className="size-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const product = row.original

      return <span>{product.type === '' ? 'No type specified' : product.type}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsProductCell product={row.original} />,
    enableSorting: false,
    enableHiding: false
  }
]
