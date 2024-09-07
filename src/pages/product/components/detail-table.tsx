import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { faApple, faGoogle, faWaze, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CreditCard, HandCoins, PhoneCallIcon, QrCode, WalletCards } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductStore } from '../product-store'

export default function DetailTable() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { product } = useProductStore()

  const variant = searchParams.get('variant')

  const dummyVariant = useMemo(
    () => [
      { id: 'variant-1', name: 'Variant 1' },
      { id: 'variant-2', name: 'Variant 2' }
    ],
    []
  )

  const handleSelect = useCallback(
    (key: string) => {
      searchParams.set('variant', key)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  return (
    product && (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell>{product.stock}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Variant</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>{variant ?? 'Choose Variant'}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {dummyVariant.map(variant => (
                    <DropdownMenuItem key={variant.id} onSelect={() => handleSelect(variant.id)}>
                      {variant.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment Type</TableCell>
            <TableCell>
              <TooltipProvider>
                <div className="flex items-center space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QrCode className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>QR Code</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HandCoins className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Cash</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <WalletCards className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Apple Pay/Samsung Pay/Google Pay</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CreditCard className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Credit/Debit Card</span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell>
              <div className="flex space-x-3">
                <FontAwesomeIcon icon={faWhatsapp} className="size-4" />
                <PhoneCallIcon className="size-4" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Navigate</TableCell>
            <TableCell>
              <div className="flex space-x-3">
                <FontAwesomeIcon icon={faWaze} className="size-4" />
                <FontAwesomeIcon icon={faGoogle} className="size-4" />
                <FontAwesomeIcon icon={faApple} className="size-4" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  )
}
