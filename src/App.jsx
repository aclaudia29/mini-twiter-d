///import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import logo from '../src/image/logo nuevo.jpeg'
import Navbar from './components/Navbar'
import { PrivateRoutes } from './components/PrivateRoutes'
import Notifications from './components/Notifications'

//views
import Index from './views/index'
import Login from './views/login'
import Home from './views/home'
import useAuth from './hooks/useAuth'

function App() {
  
  return (
    <>
      <Navbar />
      {/* <h1>Mini Twitter</h1> */}
      <img className='logo' src={logo} alt='logo twitter' /> 
      
      <Notifications />
      
      <Routes>        
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} />

          <Route element={<PrivateRoutes />}>
          </Route>
       </Routes>
    </>    
  )
}

export default App
