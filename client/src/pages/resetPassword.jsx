import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [isOtpverified, setIsOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const { backendUrl, navigate, setLoggedIn, loggedIn, loading, setLoading } = useContext(AppContext);


    // Send OTP for resetting password
    const resetPassOtp = async (e) => {
        axios.defaults.withCredentials = true;

        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/user/reset-pass-otp', { email }, { withCredentials: true })
            if (response.data.success) {
                toast(response.data.message)
                setIsOtpVerified(true);
                setLoading(false)
            } else {
                toast(response.data.message)
                setLoading(false)
                console.log(response)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Verify otp and setting new password
    const resetPassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/user/reset-pass', { otp: otp.trim(), email, newPassword }, { withCredentials: true })
            if (response.data.success) {
                toast(response.data.message)
                setLoggedIn(true);
                setLoading(false)
                navigate('/')
            } else {
                toast(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    useEffect(() => {
        loggedIn ? navigate('/') : ''
    }, [loggedIn])

    return (
        <div className='w-full h-screen backdrop-blur-2xl  flex items-center justify-center fixed'>
            {/* To send OTP to user's email */}
            {!isOtpverified && <form onSubmit={resetPassOtp} className='sm:min-w-sm relative bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8 rounded-md flex flex-col' >
                <h1 className='text-2xl font-medium text-center mb-5'>Reset Password</h1>
                <p className='text-sm md:text-lg text-purple-300'>Enter your email</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full outline-none mt-3 border-2 placeholder:text-sm border-purple-300 p-2 rounded-md'
                    type="email" placeholder='eg:johndoe@gmail.com' required />
                <button type='submit' className='py-2 px-5 text-lg font-medium my-5 cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 rounded-md'>Send OTP</button>
            </form>}

            {
                loading ? <Loader /> :

                    isOtpverified && <form onSubmit={resetPassword} className='sm:min-w-sm relative bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8 rounded-md flex flex-col gap-2' >
                        <h1 className='text-2xl font-medium text-center mb-5'>Reset Password</h1>
                        <p className='text-sm md:text-[16px] text-purple-300 my-1'>Enter OTP</p>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} className='w-full outline-none mt-2 border-2 placeholder:text-sm border-purple-300 p-2 rounded-md'
                            type="text" placeholder='eg:123456' required />
                        <p className='text-sm  md:text-[16px] text-purple-300 my-1'>Email</p>
                        <div className='flex justify-between gap-2 items-center border-2 border-purple-300 rounded-md py-2 px-3'>
                            <input className='w-full outline-none  placeholder:text-sm'
                                onChange={(e) => setEmail(e.target.value)} type="email" placeholder='eg:johndoe@gmail.com' value={email} required />
                            <i class="fa-solid fa-envelope  text-sm"></i>
                        </div>
                        <p className='text-sm  md:text-[16px] text-purple-300 my-1'>New Password</p>
                        <div className='flex justify-between gap-2 items-center border-2 border-purple-300 rounded-md py-2 px-3'>
                            <input className='outline-none  placeholder:text-sm flex-1'
                                onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={showPassword ? 'text' : 'password'} placeholder='john@1234' required />

                            {showPassword ? <i class="fa-solid fa-eye-slash text-sm  cursor-pointer" onClick={() => setShowPassword(false)}></i> : <i onClick={() => setShowPassword(true)} class="fa-solid fa-eye text-sm cursor-pointer"></i>}
                        </div>
                        <button type='submit' className='py-2 px-5 text-lg font-medium my-5 cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 rounded-md'>Submit</button>
                        <p onClick={resetPassOtp} className='cursor-pointer text-purple-300 ml-1'>Resend OTP</p>

                    </form>}
        </div>
    )
}

export default ResetPassword
