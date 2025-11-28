import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const verifyEmail = () => {


  const { backendUrl, navigate, user, getUserData, loading, setLoading } = useContext(AppContext);
  const [otp, setOtp] = useState('');

  const verifyEmail = async (e) => {

    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/user/verify-email', { otp: Number(otp) }, { withCredentials: true })
      if (data.success) {
        toast(data.message)
        getUserData()
        setLoading(false)
        navigate('/')
      } else {
        toast.error(data.message)
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    user?.isVerified && navigate('/')
  }, [user])


  const sendVerifyOtp = async () => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp', { withCredentials: true })
      if (data.success) {
        toast(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }




  return (
    <>
      {loading ? <Loader /> : <div className='w-full h-screen backdrop-blur-2xl  flex items-center justify-center fixed'>
        {/* To send OTP to user's email */}
        <form onSubmit={verifyEmail} className='sm:min-w-sm relative bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8 rounded-md flex flex-col' >
          <h1 className='text-2xl font-medium text-center mb-5'>Verify OTP</h1>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} className='w-full outline-none mt-3 border-2 placeholder:text-sm border-purple-300 p-2 rounded-md text-center'
            type="text" placeholder='Enter OTP' required />
          <button type='submit' className='py-2 px-5 text-lg font-medium my-5 cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 rounded-md'>Submit</button>
          <p onClick={sendVerifyOtp} className='cursor-pointer text-purple-300 ml-1'>Resend OTP</p>
        </form>

      </div>}

    </>
  )
}

export default verifyEmail
