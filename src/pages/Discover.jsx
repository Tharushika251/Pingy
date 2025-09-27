import React, { useState, useEffect } from 'react'
import { dummyConnectionsData, allUsers } from '../assets/assets'
import { Search, Users, MapPin, X } from 'lucide-react'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'

const Discover = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // Initialize users
  useEffect(() => {
    const allUsersArray = Object.values(allUsers || dummyConnectionsData)
    setUsers(allUsersArray)
    setFilteredUsers(allUsersArray)
  }, [])

  // Search function - shows related profiles as you type
  const searchUsers = (searchTerm) => {
    if (!searchTerm.trim()) {
      return users
    }

    const searchLower = searchTerm.toLowerCase()

    return users.filter(user => {
      return (
        // Search in name
        user.full_name?.toLowerCase().includes(searchLower) ||
        // Search in username
        user.username?.toLowerCase().includes(searchLower) ||
        // Search in bio
        user.bio?.toLowerCase().includes(searchLower) ||
        // Search in location (primary focus)
        user.location?.toLowerCase().includes(searchLower)
      )
    })
  }

  // Real-time search as user types
  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)

    setLoading(true)

    // Small delay for better UX (debounce)
    setTimeout(() => {
      const results = searchUsers(value)
      setFilteredUsers(results)
      setLoading(false)
    }, 300)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setTimeout(() => {
        const results = searchUsers(input)
        setFilteredUsers(results)
        setLoading(false)
      }, 200)
    }
  }

  const clearSearch = () => {
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setFilteredUsers(users)
      setLoading(false)
    }, 200)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>

        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Discover People</h1>
          <p className='text-slate-600'>Connect with amazing people and grow your network</p>
        </div>

        {/* Search Bar */}
        <div className='mb-8'>
          <div className='relative shadow-md rounded-lg border border-slate-200/60 bg-white/80'>
            <div className='p-6'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search by name, username, bio, or location...'
                  className='pl-10 pr-10 sm:pl-12 sm:pr-12 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base'
                  onChange={handleInputChange}
                  value={input}
                  onKeyUp={handleSearch}
                />
                {input && (
                  <button
                    onClick={clearSearch}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                  >
                    <X className='w-4 h-4' />
                  </button>
                )}
              </div>              
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-2 text-slate-600'>
            <Users className='w-5 h-5' />
            <span className='font-medium'>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
              {input && ` for "${input}"`}
            </span>
          </div>

          {/* Location Summary */}
          {input && filteredUsers.length > 0 && (
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <MapPin className='w-4 h-4' />
              <span>
                {filteredUsers.filter(user =>
                  user.location?.toLowerCase().includes(input.toLowerCase())
                ).length} from this location
              </span>
            </div>
          )}
        </div>

        {/* Users Grid */}
        {loading ? (
          <Loading height='40vh' />
        ) : filteredUsers.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredUsers.map((user) => (
              <UserCard
                user={user}
                key={user._id}
                highlight={input} // Pass search term for highlighting
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <Users className='w-16 h-16 text-slate-300 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-slate-600 mb-2'>No users found</h3>
            <p className='text-slate-500 mb-4'>
              {input ? `No results for "${input}"` : 'No users available at the moment'}
            </p>
            {input && (
              <button
                onClick={clearSearch}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Search Tips */}
        {filteredUsers.length > 0 && input && (
          <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <h4 className='font-semibold text-blue-900 mb-2'>Search Tips</h4>
            <ul className='text-sm text-blue-800 space-y-1'>
              <li>• Search by city names like "New York" or "London"</li>
              <li>• Try usernames like "john_warren"</li>
              <li>• Search for interests in bios like "design" or "tech"</li>
              <li>• Use full names for more accurate results</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Discover