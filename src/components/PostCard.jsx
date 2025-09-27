import { BadgeCheck, Heart, MessageCircle, Share2, Send, X, Smile } from 'lucide-react'
import moment from 'moment'
import React, { useState, useRef } from 'react'
import { dummyUserData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onLikeUpdate }) => {
    const postWithHashTags = post.content.replace(/#(\w+)/g, '<span class="text-blue-500 cursor-pointer">#$1</span>');

    const [likes, setLikes] = useState(post.likes || []);
    const [comments, setComments] = useState(post.comments || []);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const commentInputRef = useRef(null);
    const currentUser = dummyUserData;

    // Initialize user's likedPosts if it doesn't exist
    if (!currentUser.likedPosts) {
        currentUser.likedPosts = [];
    }

    // Check if current user has liked this post (single source of truth)
    const hasUserLiked = () => {
        // First check the user's likedPosts array (main source)
        const hasLikedInProfile = currentUser.likedPosts.includes(post._id);

        // Also check the post's likes array for consistency
        const hasLikedInPost = likes.some(like =>
            like.user?._id === currentUser._id || like === currentUser._id
        );

        return hasLikedInProfile || hasLikedInPost;
    }

    const handleLike = async () => {
        const alreadyLiked = hasUserLiked();

        if (alreadyLiked) {
            // Remove like from post's likes array
            const updatedLikes = likes.filter(like =>
                (like.user?._id !== currentUser._id && like !== currentUser._id)
            );
            setLikes(updatedLikes);

            // Remove from user's likedPosts
            if (currentUser.likedPosts.includes(post._id)) {
                currentUser.likedPosts = currentUser.likedPosts.filter(id => id !== post._id);
                console.log(`Removed post ${post._id} from likedPosts`);

                // Notify parent component about the like update
                if (onLikeUpdate) {
                    onLikeUpdate(post._id, false);
                }
            }
        } else {
            // Add like to post's likes array (prevent duplicates)
            const userLikeObject = { user: currentUser, createdAt: new Date().toISOString() };
            const userLikeId = currentUser._id;

            // Check if like already exists to prevent duplicates
            const likeExists = likes.some(like =>
                like.user?._id === currentUser._id || like === currentUser._id
            );

            if (!likeExists) {
                const newLikes = [...likes, userLikeObject];
                setLikes(newLikes);
            }

            // Add to user's likedPosts (prevent duplicates)
            if (!currentUser.likedPosts.includes(post._id)) {
                currentUser.likedPosts = [...currentUser.likedPosts, post._id];
                console.log(`Added post ${post._id} to likedPosts`);

                // Notify parent component about the like update
                if (onLikeUpdate) {
                    onLikeUpdate(post._id, true);
                }
            }
        }

        // Log current state for debugging
        console.log('Current likedPosts:', currentUser.likedPosts);
        console.log('Current post likes count:', likes.length);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            _id: `comment_${Date.now()}`,
            user: currentUser,
            text: newComment.trim(),
            createdAt: new Date().toISOString(),
            likes: []
        };

        setComments([...comments, comment]);
        setNewComment('');

        // Auto-scroll to new comment
        setTimeout(() => {
            const commentsContainer = document.getElementById(`comments-${post._id}`);
            if (commentsContainer) {
                commentsContainer.scrollTop = commentsContainer.scrollHeight;
            }
        }, 100);
    }

    const handleShare = async () => {
        const url = `${window.location.origin}/post/${post._id}`;
        setShareUrl(url);
        setIsSharing(true);

        try {
            await navigator.clipboard.writeText(url);
            console.log('URL copied to clipboard');
        } catch (err) {
            console.error('Failed to copy URL: ', err);
        }

        setTimeout(() => setIsSharing(false), 2000);
    }

    const handleCommentLike = (commentId) => {
        setComments(comments.map(comment => {
            if (comment._id === commentId) {
                const hasLiked = comment.likes.some(like =>
                    like.user?._id === currentUser._id || like === currentUser._id
                );

                if (hasLiked) {
                    return {
                        ...comment,
                        likes: comment.likes.filter(like =>
                            (like.user?._id !== currentUser._id && like !== currentUser._id)
                        )
                    };
                } else {
                    return {
                        ...comment,
                        likes: [...comment.likes, { user: currentUser }]
                    };
                }
            }
            return comment;
        }));
    }

    const getLikesCount = () => {
        // Ensure we don't count duplicates
        const uniqueLikes = likes.filter((like, index, array) => {
            if (like.user) {
                return array.findIndex(l => l.user?._id === like.user?._id) === index;
            }
            return array.indexOf(like) === index;
        });
        return uniqueLikes.length;
    }

    const getCommentsCount = () => comments.length;
    const getSharesCount = () => post.shares || 0;

    const navigate = useNavigate();

    return (
        <div className='w-full bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-2xl hover:shadow-xl transition-shadow duration-300'>
            {/* User info */}
            <div
                onClick={() => navigate(`/profile/` + post.user._id)}
                className='inline-flex items-center gap-3 cursor-pointer group'
            >
                <img
                    src={post.user.profile_picture}
                    alt={post.user.full_name}
                    className='w-12 h-12 rounded-full shadow-md group-hover:shadow-lg transition-shadow'
                />
                <div>
                    <div className='flex items-center space-x-2'>
                        <span className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                            {post.user.full_name}
                        </span>
                        {post.user.is_verified && (
                            <BadgeCheck className='w-5 h-5 text-blue-500' />
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
                    className='text-gray-800 text-base leading-relaxed whitespace-pre-line'
                    dangerouslySetInnerHTML={{ __html: postWithHashTags }}
                />
            )}

            {/* Images */}
            {post.image_urls && post.image_urls.length > 0 && (
                <div className={`grid gap-3 ${post.image_urls.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.image_urls.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Post image ${index + 1}`}
                            className={`w-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-zoom-in ${post.image_urls.length === 1 ? 'max-h-96' : 'h-48'
                                }`}
                            onClick={() => window.open(img, '_blank')}
                        />
                    ))}
                </div>
            )}

            {/* Stats Bar */}
            <div className='flex items-center justify-between text-gray-500 text-sm pt-3 border-t border-gray-200'>
                <div className='flex items-center space-x-4'>
                    <span>{getLikesCount()} likes</span>
                    <span>{getCommentsCount()} comments</span>
                    <span>{getSharesCount()} shares</span>
                </div>
                <span>{post.views || 0} views</span>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 text-gray-600 text-sm pt-2 border-t border-gray-200'>
                <button
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200 ${hasUserLiked()
                            ? 'text-red-600 bg-red-50 hover:bg-red-100'
                            : 'hover:bg-gray-100'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${hasUserLiked() ? 'fill-current' : ''}`} />
                    <span className="font-medium">
                        {hasUserLiked() ? 'Liked' : 'Like'}
                    </span>
                </button>

                <button
                    onClick={() => {
                        setShowComments(!showComments);
                        setTimeout(() => commentInputRef.current?.focus(), 100);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">Comment</span>
                </button>

                <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">
                        {isSharing ? 'Sharing...' : 'Share'}
                    </span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                    {/* Comment Input */}
                    <form onSubmit={handleCommentSubmit} className="flex gap-3">
                        <img
                            src={currentUser.profile_picture}
                            alt={currentUser.full_name}
                            className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 relative">
                            <input
                                ref={commentInputRef}
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    {/* Comments List */}
                    {comments.length > 0 ? (
                        <div id={`comments-${post._id}`} className="space-y-3 max-h-64 overflow-y-auto">
                            {comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3 group">
                                    <img
                                        src={comment.user.profile_picture}
                                        alt={comment.user.full_name}
                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-sm">
                                                    {comment.user.full_name}
                                                </span>
                                                {comment.user.is_verified && (
                                                    <BadgeCheck className="w-3 h-3 text-blue-500" />
                                                )}
                                            </div>
                                            <p className="text-gray-800 text-sm">{comment.text}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 px-2">
                                            <span className="text-xs text-gray-500">
                                                {moment(comment.createdAt).fromNow()}
                                            </span>
                                            <button
                                                onClick={() => handleCommentLike(comment._id)}
                                                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                                            >
                                                Like ({comment.likes?.length || 0})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-4">
                            No comments yet. Be the first to comment!
                        </div>
                    )}
                </div>
            )}

            {/* Share Modal */}
            {isSharing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Share Post</h3>
                            <button
                                onClick={() => setIsSharing(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">Post link copied to clipboard!</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(shareUrl)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostCard;