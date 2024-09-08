import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  Car,
  ChevronDown,
  Clipboard,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  Milestone,
  Pencil,
  Phone
} from 'lucide-react'
import { toast } from 'sonner'

import { getBusiness } from '@/api/business'
import ErrorComponent from '@/components/error'
import { Image } from '@/components/image'
import Loading from '@/components/loading'
import ProductListPreview from '@/pages/product/components/product-list-preview'
import { Button } from '@/components/ui/button'
import DialogDrawer from '@/components/ui/dialog-drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CopyToClipboard } from '@/lib/clipboard'
import { useAuthStore } from '@/store/auth-store'

type BusinessDetailsViewProps = {
  businessId: string | null
}
export default function BusinessDetailsView({ businessId }: BusinessDetailsViewProps) {
  const userId = useAuthStore.use.user()?.id
  const navigate = useNavigate()

  const [isCopied, setIsCopied] = useState(false)
  const [openBusinessHourInfo, setOpenBusinessHourInfo] = useState(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['business', businessId],
    queryFn: () => getBusiness(businessId ?? '')
  })

  if (!businessId) return

  async function handleCopyToClipboard() {
    if (!data?.phone) return

    try {
      await CopyToClipboard(data.phone)
      setIsCopied(true)
      toast.info('Phone number copied to clipboard')
      setTimeout(() => setIsCopied(false), 3000)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      }

      toast.error('Failed to copy phone number')
    }
  }

  function handleOpenBusinessHour() {
    setOpenBusinessHourInfo(true)
  }

  function handleCloseBusinessDetails() {
    setOpenBusinessHourInfo(false)
  }

  function handleOpenWaze() {
    if (!data?.address) return

    window.open(`https://waze.com/ul?q=${data.address}`)
  }

  function handleNavigateUpdateBusiness() {
    navigate(`/business/update/${businessId}`)
  }

  function handleOpenGMaps() {
    if (!data?.address) return

    window.open(`https://maps.google.com/?q=${data.address.replace(/ /g, '+').replace(/,/g, '')}`)
  }

  if (isLoading) return <Loading />
  if (isError || !data)
    return <ErrorComponent message={!data ? 'No data received' : error.message} />

  return (
    <div className="flex flex-col space-y-20 py-4">
      <div className="relative w-full max-w-sm">
        <div className="flex aspect-video h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          {data.coverPhoto ? (
            <Image src={data.coverPhoto} alt="cover-photo" className="size-full object-contain" />
          ) : (
            <span className="text-sm text-gray-500">Click to add a cover photo</span>
          )}
        </div>
        <div className="absolute -bottom-4 left-4 size-20 translate-y-1/2 transform overflow-hidden rounded-full border-2 border-gray-500 bg-gray-200">
          {data.profilePhoto ? (
            <Image
              src={data.profilePhoto}
              alt="profile-photo"
              className="size-full object-contain"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-center text-xs text-gray-500">
              Click to add a profile photo
            </span>
          )}
        </div>
        <span className="absolute -bottom-8 left-28 z-10 font-semibold">{data.name}</span>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          {userId === data.businessOwnerId && (
            <div className="flex items-center justify-center">
              <Button
                onClick={handleNavigateUpdateBusiness}
                className="flex items-center space-x-2"
              >
                <Pencil className="size-4" />
                <span>Update Business</span>
              </Button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Mail className="size-4" />
            <a
              className="underline-offset-4 hover:text-blue-500 hover:underline"
              href={`mailto:${data.email}`}
            >
              {data.email}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <Phone className="size-4" />
              {/* TODO: use international format */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="underline-offset-4 hover:text-blue-500 hover:underline"
                      href={`https://wa.me/:${data.phone}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {data.phone}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Click to send a message on WhatsApp</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCopyToClipboard} variant="ghost" size="icon">
                    {isCopied ? (
                      <ClipboardCheck className="size-4" />
                    ) : (
                      <Clipboard className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Click to copy phone number</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="size-4" />
            {data.website ? (
              <a
                className="flex flex-1 items-center justify-between underline-offset-4 hover:text-blue-500 hover:underline"
                href={`${data.website}`}
              >
                <span>{data.website}</span>
                <div className="px-2">
                  <ExternalLink className="size-4" />
                </div>
              </a>
            ) : (
              <span>No website added</span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="size-4" />
              {/* TODO: actual business hour */}
              <span className="text-green-500">Open Now</span>
            </div>
            <Button onClick={handleOpenBusinessHour} variant="ghost" size="icon">
              <ChevronDown className="size-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Milestone className="size-4" />
              <a
                className="underline-offset-4 hover:text-blue-500 hover:underline"
                href={`mailto:${data.email}`}
              >
                {data.address}
              </a>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Car className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Navigate By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleOpenWaze}>Waze</DropdownMenuItem>
                <DropdownMenuItem onSelect={handleOpenGMaps}>Google Maps</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ProductListPreview businessId={businessId} />

        <div className="flex flex-col">
          <span className="text-xs text-gray-400">{`Created at ${format(new Date(data.createdAt), 'PPP')}`}</span>
          <span className="text-xs text-gray-400">{`Updated at ${format(new Date(data.updatedAt), 'PPP')}`}</span>
        </div>
      </div>

      <DialogDrawer
        open={openBusinessHourInfo}
        onClose={handleCloseBusinessDetails}
        title="Business Hour"
      >
        {/* TODO: use actual data */}
        <Table>
          <TableCaption>Updated about 2 years ago</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Weekday</TableCell>
              <TableCell className="text-right">11.00 - 19.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Weekend</TableCell>
              <TableCell className="text-right">11.00 - 21.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Public Holiday</TableCell>
              <TableCell className="text-right">11.00 - 21.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogDrawer>
    </div>
  )
}
