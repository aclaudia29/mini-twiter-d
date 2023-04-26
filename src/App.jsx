///import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import logo from '../src/image/twitter-rosa.png'
import './App.css'
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
