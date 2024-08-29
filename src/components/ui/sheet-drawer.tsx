import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'

type SheetDrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  description?: string
  footer: React.ReactNode
}

export function SheetDrawer({
  open,
  onClose,
  children,
  title,
  description,
  footer
}: SheetDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function handleClose() {
    onClose()
  }

  return isDesktop ? (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
