import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

// Menu items.
const items = [
    {
      title: "Console",
      url: "dashboard/console",
      icon: Home,
    },
    {
      title: "Sales",
      url: "dashboard/sales",
      icon: Inbox,
    },
    {
      title: "Products",
      url: "dashboard/products",
      icon: Calendar,
    },
    {
      title: "Customers",
      url: "dashboard/customers",
      icon: Search,
    },
    {
      title: "Settings",
      url: "dashboard/settings",
      icon: Settings,
    },
  ]
function AppSidebar() {

  return (
    <Sidebar>
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