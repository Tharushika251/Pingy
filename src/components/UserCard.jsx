import React from 'react'
import { BadgeCheck, MapPin, UserPlus } from 'lucide-react'

const UserCard = ({ user, highlight }) => {
    // Function to highlight matching text
    const highlightText = (text) => {
        if (!highlight || !text) return text

        const regex = new RegExp(`(${highlight})`, 'gi')
        return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6'>
            <div className='flex items-center gap-4 mb-4'>
                <img
                    src={user.profile_picture}
                    alt={user.full_name}
                    className='w-16 h-16 rounded-full object-cover border-2 border-white shadow-md'
                />
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-1'>
                        <h3
                            className='font-semibold text-gray-900 truncate'
                            dangerouslySetInnerHTML={{ __html: highlightText(user.full_name) }}
                        />
                        {user.is_verified && <BadgeCheck className='w-4 h-4 text-blue-500 flex-shrink-0' />}
                    </div>
                    <p
                        className='text-gray-600 text-sm truncate'
                        dangerouslySetInnerHTML={{ __html: highlightText(`@${user.username}`) }}
                    />
                </div>
            </div>

            {user.bio && (
                <p
                    className='text-gray-700 text-sm mb-4 line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: highlightText(user.bio) }}
                />
            )}

            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1 text-gray-500 text-sm'>
                    <MapPin className='w-4 h-4' />
                    <span
                        dangerouslySetInnerHTML={{ __html: highlightText(user.location) }}
                    />
                </div>

                <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'>
                    <UserPlus className='w-4 h-4' />
                    Connect
                </button>
            </div>
        </div>
    )
}

export default UserCard