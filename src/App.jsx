import { Routes, Route } from 'react-router-dom';
import Login from './pages/userService/login';
import Register from './pages/userService/register';
import Profile from './pages/userService/profile';
import Layout from './pages/Layout';
import { useAuth } from './hooks/useAuth';
import CreatePost from './pages/CreatePost';
import ChatBox from './pages/ChatBox';
import Connections from './pages/Connections';
import Discover from './pages/Discover';
import Feed from './pages/Feed';
import LoginNew from './pages/Login';
import Messages from './pages/Messages';
import ProfileNew from './pages/Profile';
import Setting from './components/Setting';
import StoriesBar from './components/StoriesBar';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path='/' element={!currentUser ? <Login /> : <Layout/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="/chat-box" element={<ChatBox />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/login-ignore" element={<LoginNew />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile-ignore" element={<ProfileNew />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/story" element={<StoriesBar />} />






    </Routes>
  )
}

export default App
