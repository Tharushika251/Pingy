import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
    const postWithHashTags = post.content.replace(/#(\w+)/g, '<span class="text-blue-500 cursor-pointer">#$1</span>');

    // Fix: Use post.likes array instead of post.likes_count
    const [likes, setLikes] = useState(post.likes || []);
    const currentUser = dummyUserData;

    const handleLike = async () => {
        // Check if current user already liked the post
        const hasLiked = likes.some(like =>
            like.user?._id === currentUser._id || like === currentUser._id
        );

        if (hasLiked) {
            // Remove like
            setLikes(likes.filter(like =>
                (like.user?._id !== currentUser._id && like !== currentUser._id)
            ));
        } else {
            // Add like - handle both object and ID formats
            const newLike = post.likes && post.likes[0] && post.likes[0].user
                ? { user: currentUser, createdAt: new Date().toISOString() }
                : currentUser._id;

            setLikes([...likes, newLike]);
        }
    }

    // Helper function to get likes count
    const getLikesCount = () => {
        return likes.length;
    }

    // Helper function to check if current user liked the post
    const hasUserLiked = () => {
        return likes.some(like =>
            like.user?._id === currentUser._id || like === currentUser._id
        );
    }

    // Helper function to get comments count (fallback to 0 if undefined)
    const getCommentsCount = () => {
        return post.comments ? post.comments.length : 0;
    }

    // Helper function to get shares count (fallback to 0 if undefined)
    const getSharesCount = () => {
        return post.shares || 0;
    }

    const navigate = useNavigate();

    return (
        <div className='w-full bg-white rounded-xl shadow p-4 space-y-4 max-w-2xl'>
            {/* User info */}
            <div
                onClick={() => navigate(`/profile/` + post.user._id)}
                className='inline-flex items-center gap-3 cursor-pointer'
            >
                <img
                    src={post.user.profile_picture}
                    alt={post.user.full_name}
                    className='w-10 h-10 rounded-full shadow'
                />
                <div>
                    <div className='flex items-center space-x-1'>
                        <span className='font-medium'>{post.user.full_name}</span>
                        {post.user.is_verified && (
                            <BadgeCheck className='w-4 h-4 text-blue-500' />
                        )}
                    </div>
                    <div className='text-gray-500 text-sm'>
                        @{post.user.username} ● {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* Content */}
            {post.content && (
                <div
                    className='text-gray-800 text-sm whitespace-pre-line'
                    dangerouslySetInnerHTML={{ __html: postWithHashTags }}
                />
            )}

            {/* Images */}
            {post.image_urls && post.image_urls.length > 0 && (
                <div className={`grid gap-2 ${post.image_urls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                    }`}>
                    {post.image_urls.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Post image ${index + 1}`}
                            className={`w-full object-cover rounded-lg ${post.image_urls.length === 1 ? 'h-80' : 'h-48'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
                <div className='flex items-center gap-1'>
                    <Heart
                        className={`w-4 h-4 cursor-pointer transition-colors ${hasUserLiked() ? 'text-red-500 fill-red-500' : 'hover:text-red-500'
                            }`}
                        onClick={handleLike}
                    />
                    <span>{getLikesCount()}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4 cursor-pointer hover:text-blue-500' />
                    <span>{getCommentsCount()}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Share2 className='w-4 h-4 cursor-pointer hover:text-green-500' />
                    <span>{getSharesCount()}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard;