import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Boxes, House, DollarSign, UsersRound, Cog } from 'lucide-react'
import { NavLink } from 'react-router-dom'

// Menu items.
const items = [
    {
      title: "Console",
      url: "dashboard/console",
      icon: <House size={'1.2rem'}/>,
    },
    {
      title: "Sales",
      url: "dashboard/sales",
      icon: <DollarSign size={'1.2rem'}/>,
    },
    {
      title: "Products",
      url: "dashboard/products",
      icon: <Boxes size={'1.2rem'}/>,
    },
    {
      title: "Customers",
      url: "dashboard/customers",
      icon: <UsersRound size={'1.2rem'}/>,
    },
    {
      title: "Settings",
      url: "dashboard/settings",
      icon: <Cog size={'1.2rem'}/>,
    },
  ]
function AppSidebar() {

  return (
    <Sidebar className={''}>
      <SidebarContent className='dark:bg-black overflow-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel className='m-2 ml-5 mt-3 text-lg'>C R M</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='mx-4 ml-10 my-4'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/${item.url}`}>
                      {/* <item.icon /> */}
                        <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
          )
}

export default AppSidebar