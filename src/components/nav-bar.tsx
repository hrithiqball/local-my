import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

export default function NavBar() {
  const businesses = [
    {
      title: 'Certified Business',
      href: '/business?certified=true',
      description: 'Businesses that are certified'
    },
    {
      title: 'Local Business',
      href: '/business?local=true',
      description: 'Local businesses that are not certified'
    },
    {
      title: 'Top Rated',
      href: '/business?top-rated=true',
      description: 'Businesses that are top rated'
    }
  ]

  const services = [
    {
      title: 'Food',
      href: '/services?category=food',
      description: 'Foodies can find a variety of local food'
    },
    {
      title: 'Craft',
      href: '/services?category=craft',
      description: 'Local craft items, from handmade jewelry to custom furniture.'
    }
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Business</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {businesses.map(business => (
                <ListItem key={business.title} title={business.title} href={business.href}>
                  {business.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {services.map(service => (
                <ListItem key={service.title} title={service.title} href={service.href}>
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
