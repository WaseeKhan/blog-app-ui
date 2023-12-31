import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pges/About';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './pges/Home';
import Login from './pges/Login';
import Signup from './pges/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pges/UserRoutes/ProfileInfo';
import AddPost from './components/AddPost';
import PostPage from './pges/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pges/Categories';
import Index from './TypingApp/Index'
import UpdateBlog from './pges/UpdateBlog';
import Dashboard from './pges/UserRoutes/Dashboard';
import YourPosts from './pges/UserRoutes/YourPosts';
import AllUsers from './components/AllUsers';
import Contact from './pges/Contact';
import UpdateProfile from './pges/UpdateProfile';


function App() {
  return (
    <UserProvider>
  <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/posts/:postId" element={<PostPage />}></Route>
      <Route path="/categories/:categoryId" element={<Categories />}></Route>
      <Route path="/typing-app" element={<Index />}></Route>

      <Route path="/user" element={<Privateroute />}>
        {/* <Route path="dashboard" element={<Userdashboard />}></Route> */}
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="profile/:userId" element={<ProfileInfo />}></Route>
        <Route path="add-post" element={<AddPost />}></Route>
        <Route path="update-blog/:blogId" element={<UpdateBlog />}></Route>
        <Route path="your-posts/" element={<YourPosts />}></Route>
        <Route path="all-users/" element={<AllUsers />}></Route>
        <Route path="update-profile/:userId" element={<UpdateProfile />}></Route>
      </Route>
      
    </Routes>
    <ToastContainer />
  </BrowserRouter>
  </UserProvider>
  );
}

export default App;
