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
      url: "#",
      icon: Settings,
    },
  ]
function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>C R M</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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