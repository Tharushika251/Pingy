import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut, Menu, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleProfileClick = () => {
        navigate('/profile')
    }

    return (
        <div
            className={`
                fixed top-24 left-0 bottom-0 
                ${sidebarOpen ? 'w-60 xl:w-72' : 'w-20'} 
                bg-white border-r border-gray-200 
                flex flex-col justify-between
                z-20 transition-all duration-300 ease-in-out
            `}
        >
            {/* Toggle button */}
            <div className="flex justify-end p-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md hover:bg-gray-100 transition"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    ) : (
                        <Menu className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Main section */}
            <div className="w-full flex-1 overflow-y-auto">
                <MenuItems sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <Link
                    to='/create-post'
                    className={`flex items-center gap-2 py-2.5 mt-6 mx-3 rounded-lg 
                        bg-gradient-to-r from-indigo-500 to-purple-600 
                        hover:from-indigo-700 hover:to-purple-800 
                        active:scale-95 transition text-white cursor-pointer
                        ${sidebarOpen ? "px-4" : "justify-center"}
                    `}
                >
                    <CirclePlus className="w-5 h-5" />
                    {sidebarOpen && <span>Create Post</span>}
                </Link>
            </div>

            {/* User info */}
            {currentUser && (
                <div className="w-full border-t border-gray-200 p-4 flex items-center justify-between">
                    <div
                        className={`flex items-center cursor-pointer ${sidebarOpen ? "gap-2" : "justify-between w-full"}`}
                        onClick={handleProfileClick}
                    >
                        <img
                            src={currentUser.profile_image || '/default-avatar.png'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {sidebarOpen && (
                            <div>
                                <h1 className="text-sm font-medium">{currentUser.name}</h1>
                                <p className="text-xs text-gray-500">@{currentUser.user_id}</p>
                            </div>
                        )}
                    </div>

                    {/* Logout button positioning */}
                    {sidebarOpen ? (
                        <LogOut
                            onClick={handleLogout}
                            className="w-[32px] h-[32px] text-gray-400 hover:text-gray-700 transition cursor-pointer"
                        />
                    ) : (
                        <LogOut
                            onClick={handleLogout}
                            className="w-[36px] h-[36px] text-gray-400 hover:text-gray-700 transition cursor-pointer mb-20"
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Sidebar
