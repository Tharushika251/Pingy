// const USER_SERVICE_API_URL = 'http://localhost:5000/api';
// const PINGY_SERVICE_API_URL = 'http://localhost:5001/api';

// const fetchApi = async (endpoint, options = {}) => {
//     const headers = {
//         'Content-Type': 'application/json',
//         ...options.headers,
//     };

//     const token = localStorage.getItem('token');
//     if (token) {
//         headers.Authorization = `Bearer ${token}`;
//     }

//     const config = {
//         ...options,
//         headers,
//     };

//     try {
//         const response = await fetch(`${endpoint}`, config);
//         // console.log('API Request:', { endpoint, options });
//         // console.log('API Response:', response);

//         if (response.status === 401) {
//             localStorage.removeItem('token');
//             window.location.href = '/login';
//             return null;
//         }

//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             const text = await response.text();
//             const data = text ? JSON.parse(text) : {};

//             if (!response.ok) {
//                 throw new Error(data.message || 'Something went wrong');
//             }

//             return data;
//         } else {

//             if (!response.ok) {
//                 throw new Error('Something went wrong');
//             }

//             return { success: true };
//         }
//     } catch (error) {
//         console.error('API Error:', error);
//         throw error;
//     }
// };



// export const api = {
//     // User
//     login: (credentials) =>
//         fetchApi(USER_SERVICE_API_URL + '/users/login', {
//             method: 'POST',
//             body: JSON.stringify(credentials)
//         }),

//     register: (userData) =>
//         fetchApi(USER_SERVICE_API_URL + '/users', {
//             method: 'POST',
//             body: JSON.stringify(userData)
//         }),

//     getCurrentUser: (user_id) =>
//         fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
//             method: 'GET'
//         }),

//     editProfile: (userData, user_id) =>
//         fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
//             method: 'PUT',
//             body: JSON.stringify(userData)
//         }),

//     updateProfileImage: (userData, user_id) =>
//         fetchApi(USER_SERVICE_API_URL + '/users/pic/' + user_id, {
//             method: 'PUT',
//             body: JSON.stringify(userData)
//         }),


    
// };

// export default api;


// src/utils/api.js

const USER_SERVICE_API_URL = 'http://localhost:5000/api';
const PINGY_SERVICE_API_URL = 'http://localhost:5001/api'; // your pingy-service

const fetchApi = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${endpoint}`, config);

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } else {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return { success: true };
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const api = {
    // User
    login: (credentials) =>
        fetchApi(USER_SERVICE_API_URL + '/users/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }),

    register: (userData) =>
        fetchApi(USER_SERVICE_API_URL + '/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),

    getCurrentUser: (user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
            method: 'GET'
        }),

    editProfile: (userData, user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    updateProfileImage: (userData, user_id) =>
        fetchApi(USER_SERVICE_API_URL + '/users/pic/' + user_id, {
            method: 'PUT',
            body: JSON.stringify(userData)
        }),

    // Stories
    getStories: () =>
        fetchApi(PINGY_SERVICE_API_URL + '/stories', {
            method: 'GET'
        }),

    createStory: (storyData) =>
        fetchApi(PINGY_SERVICE_API_URL + '/stories', {
            method: 'POST',
            body: JSON.stringify(storyData)
        }),

    viewStory: (storyId) =>
        fetchApi(`${PINGY_SERVICE_API_URL}/stories/${storyId}/view`, {
            method: 'PUT'
        }),

    deleteStory: (storyId) =>
        fetchApi(`${PINGY_SERVICE_API_URL}/stories/${storyId}`, {
            method: 'DELETE'
        }),
};

export default api;
