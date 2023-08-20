import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pges/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pges/Home';
import Login from './pges/Login';
import Signup from './pges/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pges/UserRoutes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './pges/UserRoutes/ProfileInfo';
import Services from './pges/Services';
import AddPost from './components/AddPost';
import PostPage from './pges/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './pges/Categories';

function App() {
  return (
    <UserProvider>
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/posts/:postId" element={<PostPage />}></Route>
      <Route path="/categories/:categoryId" element={<Categories />}></Route>

      <Route path="/user" element={<Privateroute />}>
        <Route path="dashboard" element={<Userdashboard />}></Route>
        <Route path="profile" element={<ProfileInfo />}></Route>
        <Route path="add-post" element={<AddPost />}></Route>
      </Route>
      
    </Routes>
    <ToastContainer />
  </BrowserRouter>
  </UserProvider>
  );
}

export default App;
