import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import MenuItems from './MenuItems'
import { CirclePlus, LogOut } from 'lucide-react'
import { UserButton, useClerk } from "@clerk/clerk-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate()
    const user = dummyUserData
    const { signOut } = useClerk()

    return (
        <div
            className={`fixed sm:relative h-screen bg-white border-r border-gray-200 flex flex-col z-30
            ${sidebarOpen ? 'w-60 xl:w-72 translate-x-0' : '-translate-x-full sm:translate-x-0'} 
            transition-all duration-300 ease-in-out`}>

            {/* Sidebar Content */}
            <div className='w-60 xl:w-72 h-full flex flex-col'>
                {/* Logo Section */}
                <div className='p-4 border-b border-gray-200'>
                    <div className='flex items-center gap-3'>
                        <img
                            src={assets.logo}
                            alt='Logo'
                            className='w-12 h-12 cursor-pointer'
                            onClick={() => {
                                navigate('/')
                                setSidebarOpen(false)
                            }}
                        />
                        {/* FIXED: Changed <h> to <h1> */}
                        <h1 className="text-3xl font-bold text-indigo-600">Pingy</h1>
                    </div>
                </div>

                {/* Menu Items */}
                <div className='flex-1 overflow-y-auto py-4'>
                    <MenuItems setSidebarOpen={setSidebarOpen} />

                    <Link
                        to='/create-post'
                        onClick={() => setSidebarOpen(false)}
                        className='flex items-center justify-center gap-2 py-3 mx-4 mt-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer'
                    >
                        <CirclePlus className='w-5 h-5' />
                        Create Post
                    </Link>
                </div>

                {/* User Section */}
                <div className='border-t border-gray-200 p-4 bg-white'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3 cursor-pointer flex-1 min-w-0'>
                            <UserButton />
                            <div className='min-w-0 flex-1'>
                                <h1 className='text-sm font-medium truncate'>{user.full_name}</h1>
                                <p className='text-xs text-gray-500 truncate'>@{user.username}</p>
                            </div>
                        </div>
                        <LogOut
                            onClick={signOut}
                            className='w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer flex-shrink-0'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar