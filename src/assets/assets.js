import logo from './logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.jpg'
import bgImage from './bgImage.png'
import group_users from './group_users.png'
import { Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored_img from './sponsored_img.png'

export const assets = {
    logo,
    sample_cover,
    sample_profile,
    bgImage,
    group_users,
    sponsored_img,
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/connections', label: 'Connections', Icon: Users },
    { to: '/discover', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];

// Enhanced user data with more realistic profiles
export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "John Warren",
    "username": "john_warren",
    "bio": "🌍 Dreamer | 📚 Learner | 🚀 Doer\r\nExploring life one step at a time.\r\n✨ Staying curious. Creating with purpose.",
    "profile_picture": sample_profile,
    "cover_photo": sample_cover,
    "location": "New York, NY",
    "followers": ["user_2", "user_3", "user_4", "user_5"],
    "following": ["user_2", "user_3", "user_6"],
    "connections": ["user_2", "user_3"],
    "posts": [],
    "likedPosts": ["68773e977db16954a783839c", "686e6d0407845749500c24cd"], // Add this array
    "is_verified": true,
    "createdAt": "2025-07-09T09:26:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    _id: "user_2",
    email: "richard@example.com",
    username: "richard_hendricks",
    full_name: "Richard Hendricks",
    bio: "Tech Entrepreneur | Founder of Pied Piper | Changing the world one algorithm at a time",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    cover_photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    location: "San Francisco, CA",
    followers: ["user_1", "user_3", "user_4", "user_7"],
    following: ["user_1", "user_5"],
    connections: ["user_1"],
    posts: ["post_tech_1", "post_tech_2"],
    is_verified: true,
    createdAt: "2025-06-15T14:22:30.000Z",
    updatedAt: "2025-07-22T10:15:45.000Z",
}

const dummyUser3Data = {
    _id: "user_3",
    email: "alexa@example.com",
    username: "alexa_james",
    full_name: "Alexa James",
    bio: "Digital Artist | UI/UX Designer | Creating beautiful experiences | Coffee enthusiast ☕",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    cover_photo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000",
    location: "London, UK",
    followers: ["user_1", "user_2", "user_5", "user_6"],
    following: ["user_1", "user_2", "user_4"],
    connections: ["user_1"],
    posts: ["post_design_1", "post_art_1"],
    is_verified: false,
    createdAt: "2025-06-20T09:15:22.000Z",
    updatedAt: "2025-07-23T16:45:30.000Z",
}

const dummyUser4Data = {
    _id: "user_4",
    email: "mike@example.com",
    username: "mike_chen",
    full_name: "Mike Chen",
    bio: "Fitness Coach | Nutrition Expert | Helping people transform their lives 💪",
    profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    cover_photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
    location: "Miami, FL",
    followers: ["user_1", "user_2", "user_3"],
    following: ["user_1", "user_2"],
    connections: [],
    posts: ["post_fitness_1"],
    is_verified: true,
    createdAt: "2025-07-01T11:30:15.000Z",
    updatedAt: "2025-07-24T08:20:10.000Z",
}

const dummyUser5Data = {
    _id: "user_5",
    email: "sarah@example.com",
    username: "sarah_wilson",
    full_name: "Sarah Wilson",
    bio: "Travel Blogger | Photographer | Exploring the world one country at a time 🌎",
    profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200",
    cover_photo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000",
    location: "Sydney, Australia",
    followers: ["user_1", "user_3"],
    following: ["user_1", "user_3", "user_4"],
    connections: [],
    posts: ["post_travel_1", "post_travel_2"],
    is_verified: false,
    createdAt: "2025-06-25T16:45:33.000Z",
    updatedAt: "2025-07-22T14:25:18.000Z",
}

const dummyUser6Data = {
    _id: "user_6",
    email: "david@example.com",
    username: "david_lee",
    full_name: "David Lee",
    bio: "Software Engineer | Open Source Contributor | Building the future with code",
    profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
    cover_photo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000",
    location: "Seattle, WA",
    followers: ["user_3"],
    following: ["user_1"],
    connections: [],
    posts: ["post_code_1"],
    is_verified: true,
    createdAt: "2025-07-05T13:20:45.000Z",
    updatedAt: "2025-07-23T09:15:27.000Z",
}

const dummyUser7Data = {
    _id: "user_7",
    email: "emma@example.com",
    username: "emma_thompson",
    full_name: "Emma Thompson",
    bio: "Marketing Specialist | Content Creator | Helping brands tell their stories",
    profile_picture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200",
    cover_photo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
    location: "Chicago, IL",
    followers: ["user_2"],
    following: ["user_2", "user_5"],
    connections: [],
    posts: ["post_marketing_1"],
    is_verified: false,
    createdAt: "2025-07-10T10:15:20.000Z",
    updatedAt: "2025-07-24T11:30:45.000Z",
}

// All users array for easy access
export const allUsers = {
    user_1: dummyUserData,
    user_2: dummyUser2Data,
    user_3: dummyUser3Data,
    user_4: dummyUser4Data,
    user_5: dummyUser5Data,
    user_6: dummyUser6Data,
    user_7: dummyUser7Data,
}

export const dummyStoriesData = [
    {
        "_id": "68833d466e4b42b685068860",
        "user": dummyUserData,
        "content": "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄. The next post will make more sense 🧩.",
        "media_url": "",
        "media_type": "text",
        "background_color": "#4f46e5",
        "views": ["user_2", "user_3", "user_4"],
        "createdAt": "2025-07-25T08:16:06.958Z",
        "updatedAt": "2025-07-25T08:16:06.958Z",
    },
    {
        "_id": "688340046e4b42b685068a73",
        "user": dummyUser2Data,
        "content": "Just launched our new feature! 🚀",
        "media_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
        "media_type": "image",
        "background_color": "#10b981",
        "views": ["user_1", "user_3", "user_5", "user_7"],
        "createdAt": "2025-07-25T08:27:48.134Z",
        "updatedAt": "2025-07-25T08:27:48.134Z",
    },
    {
        "_id": "68833fe96e4b42b685068a5e",
        "user": dummyUser3Data,
        "content": "New design project coming soon!",
        "media_url": "https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
        "media_type": "video",
        "background_color": "#f59e0b",
        "views": ["user_1", "user_2", "user_4"],
        "createdAt": "2025-07-25T08:27:21.289Z",
        "updatedAt": "2025-07-25T08:27:21.289Z",
    }
]

// Enhanced posts with realistic like data and comments
export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
        "image_urls": [
            "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
        ],
        "post_type": "text_with_image",
        "likes": [
            { user: dummyUser2Data, createdAt: "2025-07-16T06:00:00.000Z" },
            { user: dummyUser3Data, createdAt: "2025-07-16T07:15:00.000Z" },
            { user: dummyUser4Data, createdAt: "2025-07-16T08:30:00.000Z" }
        ],
        "comments": [
            {
                user: dummyUser2Data,
                text: "Great work team! 👏",
                createdAt: "2025-07-16T06:05:00.000Z",
                likes: [dummyUserData]
            },
            {
                user: dummyUser3Data,
                text: "Looking forward to seeing what you build!",
                createdAt: "2025-07-16T07:20:00.000Z",
                likes: []
            }
        ],
        "shares": 12,
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUser2Data,
        "content": "Just shipped v2.0 of our platform! 🚀 So proud of the team for working tirelessly to make this happen. The new features include real-time collaboration, enhanced security, and a completely redesigned UI. #ProductLaunch #Tech #Innovation",
        "image_urls": [
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000"
        ],
        "post_type": "text_with_image",
        "likes": [
            { user: dummyUserData, createdAt: "2025-07-09T13:25:00.000Z" },
            { user: dummyUser3Data, createdAt: "2025-07-09T13:40:00.000Z" },
            { user: dummyUser4Data, createdAt: "2025-07-09T14:15:00.000Z" },
            { user: dummyUser7Data, createdAt: "2025-07-09T15:30:00.000Z" }
        ],
        "comments": [
            {
                user: dummyUserData,
                text: "Congratulations Richard! This is huge! 🎉",
                createdAt: "2025-07-09T13:28:00.000Z",
                likes: [dummyUser2Data]
            },
            {
                user: dummyUser3Data,
                text: "The new UI looks amazing! Can't wait to try it out.",
                createdAt: "2025-07-09T13:45:00.000Z",
                likes: []
            }
        ],
        "shares": 45,
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUser3Data,
        "content": "Just completed a new UI design for a fintech app! 🎨 Really excited about the minimalist approach and user-friendly interface. #UIDesign #UX #Fintech #DesignThinking",
        "image_urls": [
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000"
        ],
        "post_type": "text_with_image",
        "likes": [
            { user: dummyUserData, createdAt: "2025-07-09T13:16:00.000Z" },
            { user: dummyUser2Data, createdAt: "2025-07-09T13:18:00.000Z" },
            { user: dummyUser5Data, createdAt: "2025-07-09T13:25:00.000Z" }
        ],
        "comments": [
            {
                user: dummyUser2Data,
                text: "Clean design! Love the color scheme.",
                createdAt: "2025-07-09T13:20:00.000Z",
                likes: [dummyUser3Data]
            }
        ],
        "shares": 8,
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e3e47ba0cf0fecba19947",
        "user": dummyUser4Data,
        "content": "Morning workout complete! 💪 Remember, consistency is key. Started with 30 minutes of cardio followed by strength training. #Fitness #Workout #Health #Motivation",
        "image_urls": [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000"
        ],
        "post_type": "text_with_image",
        "likes": [
            { user: dummyUserData, createdAt: "2025-07-09T10:05:00.000Z" },
            { user: dummyUser5Data, createdAt: "2025-07-09T10:10:00.000Z" }
        ],
        "comments": [
            {
                user: dummyUser5Data,
                text: "You're inspiring me to get back to the gym!",
                createdAt: "2025-07-09T10:12:00.000Z",
                likes: [dummyUser4Data]
            }
        ],
        "shares": 3,
        "createdAt": "2025-07-09T10:02:47.213Z",
        "updatedAt": "2025-07-09T10:09:37.075Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUser5Data,
        "content": "Beautiful sunrise in Bali! 🌅 This place never fails to amaze me. 30 countries visited and counting... #Travel #Bali #Sunrise #Wanderlust",
        "image_urls": [
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000"
        ],
        "post_type": "text_with_image",
        "likes": [
            { user: dummyUserData, createdAt: "2025-07-09T09:46:00.000Z" },
            { user: dummyUser3Data, createdAt: "2025-07-09T09:50:00.000Z" },
            { user: dummyUser7Data, createdAt: "2025-07-09T10:15:00.000Z" }
        ],
        "comments": [
            {
                user: dummyUser3Data,
                text: "Stunning photo! What camera are you using?",
                createdAt: "2025-07-09T09:52:00.000Z",
                likes: [dummyUser5Data]
            }
        ],
        "shares": 15,
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    }
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "Hey John! I saw your latest post about the team project. Would love to connect and discuss potential collaboration opportunities.",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUser3Data,
        "to_user_id": dummyUserData,
        "text": "Hi John! I really like your design sense. Would you be interested in reviewing my portfolio?",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser4Data,
        "to_user_id": dummyUserData,
        "text": "Thanks for the follow! I noticed we're both interested in tech innovations. Would be great to connect!",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": dummyUser2Data._id,
        "to_user_id": dummyUserData._id,
        "text": "Check out this new feature we're working on!",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData._id,
        "to_user_id": dummyUser2Data._id,
        "text": "This looks amazing! The interface is so clean and intuitive.",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": dummyUser2Data._id,
        "to_user_id": dummyUserData._id,
        "text": "Thanks! We've been working on it for months. Would you like an early access?",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    }
]

export const dummyConnectionsData = [
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data,
    dummyUser5Data
]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data,
    dummyUser5Data,
    dummyUser6Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data,
    dummyUser4Data,
    dummyUser5Data,
    dummyUser6Data
]

export const dummyPendingConnectionsData = [
    dummyUser7Data
]

// Additional utility data
export const dummyNotificationsData = [
    {
        _id: "notif_1",
        type: "like",
        from_user: dummyUser2Data,
        post_id: "68773e977db16954a783839c",
        text: "liked your post",
        read: false,
        createdAt: "2025-07-25T11:00:00.000Z"
    },
    {
        _id: "notif_2",
        type: "comment",
        from_user: dummyUser3Data,
        post_id: "68773e977db16954a783839c",
        text: "commented on your post",
        read: false,
        createdAt: "2025-07-25T10:30:00.000Z"
    },
    {
        _id: "notif_3",
        type: "follow",
        from_user: dummyUser4Data,
        text: "started following you",
        read: true,
        createdAt: "2025-07-24T16:45:00.000Z"
    }
]

// Helper function to get user by ID
export const getUserById = (userId) => allUsers[userId] || null;

// Helper function to get post likes count
export const getPostLikesCount = (postId) => {
    const post = dummyPostsData.find(p => p._id === postId);
    return post ? post.likes.length : 0;
}

// Helper function to check if user liked a post
export const hasUserLikedPost = (postId, userId) => {
    const post = dummyPostsData.find(p => p._id === postId);
    return post ? post.likes.some(like => like.user._id === userId) : false;
}