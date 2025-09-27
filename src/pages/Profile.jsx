import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData, allUsers } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment/moment'
import ProfileModal from '../components/ProfileModal'
import { Heart, Image, FileText, RefreshCw } from 'lucide-react'

const Profile = () => {
  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0) // Force re-render when likes change

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
    setAllPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  }, [refreshKey]) // Re-fetch when refreshKey changes

  // Function to get user's liked posts (always fresh data)
  const getLikedPosts = () => {
    if (!user || !user.likedPosts || !allPosts.length) return []

    return allPosts.filter(post =>
      user.likedPosts.includes(post._id)
    )
  }

  // Function to handle like updates from PostCard
  const handleLikeUpdate = (postId, isLiked) => {
    console.log(`Like updated: Post ${postId} ${isLiked ? 'liked' : 'unliked'}`);

    // Force refresh to update the liked posts tab
    setRefreshKey(prev => prev + 1);
  }

  const getMediaPosts = () => {
    return posts.filter(post => post.image_urls && post.image_urls.length > 0)
  }

  const likedPosts = getLikedPosts()
  const mediaPosts = getMediaPosts()

  return user ? (
    <div className='relative h-full overflow-y-auto bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} alt=''
              className='w-full h-full object-cover' />}
          </div>
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>

        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {[
              { key: 'posts', label: 'Posts', icon: FileText },
              { key: 'media', label: 'Media', icon: Image },
              { key: 'likes', label: 'Likes', icon: Heart }
            ].map((tab) => (
              <button
                onClick={() => setActiveTab(tab.key)}
                key={tab.key}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${activeTab === tab.key ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.key === 'likes' && likedPosts.length > 0 && (
                  <span className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs">
                    {likedPosts.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLikeUpdate={handleLikeUpdate}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
                  <p className="text-gray-500">This user hasn't created any posts.</p>
                </div>
              )}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="mt-6">
              {mediaPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaPosts.map((post) => (
                    post.image_urls.map((image, index) => (
                      <Link
                        key={`${post._id}-${index}`}
                        to={image}
                        target='_blank'
                        className="relative group block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={image}
                          className="w-full h-48 object-cover"
                          alt={`Post media ${index + 1}`}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs">
                            Posted {moment(post.createdAt).fromNow()}
                          </p>
                        </div>
                      </Link>
                    ))
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No media posts</h3>
                  <p className="text-gray-500">This user hasn't posted any media yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Likes Tab - Now updates in real-time */}
          {activeTab === 'likes' && (
            <div className="mt-6">
              {likedPosts.length > 0 ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full text-center flex items-center justify-between">
                    <p className="text-blue-800 text-sm flex items-center">
                      <Heart className="w-4 h-4 inline mr-2" />
                      {user.full_name} has liked {likedPosts.length} {likedPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                    <button
                      onClick={() => setRefreshKey(prev => prev + 1)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Refresh likes"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  {likedPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onLikeUpdate={handleLikeUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No liked posts</h3>
                  <p className="text-gray-500">
                    {user._id === dummyUserData._id
                      ? "You haven't liked any posts yet."
                      : "This user hasn't liked any posts yet."
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && <ProfileModal setShowEdit={setShowEdit} />}
    </div>
  ) : (<Loading />)
}

export default Profile