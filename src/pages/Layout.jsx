import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {
  const user = dummyUserData
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return user ? (
    // FIXED: w-fill to w-full
    <div className='w-full flex h-screen bg-gray-50 overflow-hidden'>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='flex-1 bg-slate-50 overflow-y-auto'>
        <Outlet />
      </div>

      {/* FIXED: z-100 to z-50 */}
      {sidebarOpen ?
        <X className='absolute top-3 left-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'
          onClick={() => setSidebarOpen(false)}
        /> :
        <Menu className='absolute top-3 left-3 p-2 z-50 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'
          onClick={() => setSidebarOpen(true)} />
      }
    </div>
  ) : (
    <Loading />
  )
}

export default Layout