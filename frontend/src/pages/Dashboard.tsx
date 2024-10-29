import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import AppSidebar from '../components/AppSidebar'

function Dashboard({
    children
}: {
    children: React.ReactNode
}) {


  return (
    <div className='flex'>
        <div>
            <SidebarProvider>
            <AppSidebar />
            {/* <Sidebar_01 /> */}
            <main className='flex md:hidden'>
            <SidebarTrigger />
            </main>
        </SidebarProvider>
        </div>
      <div className='flex justify-start mt-7 sm:justify-center items-center h-full w-[100%]'>
            {children}
          </div>
    </div>
  )
}

export default Dashboard