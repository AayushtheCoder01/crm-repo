import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from './ui/sidebar'
import { Boxes, House, DollarSign, UsersRound, Cog } from 'lucide-react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useRecoilValue} from "recoil";
import {userDataAtom} from "../store/store.ts";

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
    const navigate = useNavigate()
    const isLogin = useRecoilValue(userDataAtom)

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
        <SidebarFooter className={'bg-black'}>
            <div className='flex w-full justify-start items-center h-full '>
                {
                    isLogin.id ? <div onClick={() => navigate("/dashboard/settings")}
                                      className='avatar cursor-pointer w-9 h-9 ml-2 m-1 font-semibold rounded-full flex justify-center items-center'>{isLogin?.name?.slice(0, 1) || "D"}</div> : null

                }
                {
                    isLogin.id? <h3 className='mx-2'>{isLogin.name || "Dummy"}</h3>: null
                }
            </div>
        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar