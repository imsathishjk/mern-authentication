import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import VerifyEmail from './pages/verifyEmail'
import ResetPassword from './pages/resetPassword';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import axios from 'axios';


const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div className='bg-gradient-to-b from-white to-purple-100 text-black font-[Outfit] w-full h-screen 
    overflow-x-hidden overflow-y-scroll app'>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <p className='font-medium text-sm fixed bottom-0 right-0 p-1
            z-30 bg-purple-100 left-0 text-center
            '>&copy; Reserved by Royalauth - 2025</p>

    </div>
  )
}

export default App
