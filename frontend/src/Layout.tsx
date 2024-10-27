import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function Layout() {

  return (
    <div className=''>
      <div className='m-5'>
        <Header />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout