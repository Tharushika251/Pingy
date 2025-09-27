import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="px-2 text-gray-600 space-y-1 font-medium">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `px-3 py-2 flex items-center rounded-xl transition
             ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'} 
             ${sidebarOpen ? "gap-3 justify-start" : "justify-center"}`
          }
        >
          <Icon className="w-5 h-5" />
          {sidebarOpen && <span>{label}</span>}
        </NavLink>
      ))}
    </div>
  )
}

export default MenuItems
