import { Route, Routes } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import { PrivateRoutes } from './components/PrivateRoutes'
import Notifications from './components/Notifications'

//views
import Login from './views/login'
import Home from './views/home'
import Register from './views/register'
import EditProfile from './views/EditProfile'
import UserTweets from './views/UserTweets'

function App() {
  return (
    <>
      <Navbar />
      <Notifications />

      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<UserTweets />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/EditProfile" element={<EditProfile />} />
        </Route>
      </Routes>
    </>    
     
  )
}

export default App
