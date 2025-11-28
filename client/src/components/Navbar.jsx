import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios'


const Navbar = () => {

    const { navigate, user, verifyEmail, backendUrl, loggedIn, setLoggedIn } = useContext(AppContext);


    axios.defaults.withCredentials = true;

    const sendVerifyOtp = async () => {

        try {
            const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp')

            if (data.success) {
                navigate('/verify-email')
                toast(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const userLogOut = async () => {

        try {
            const { data } = await axios.post(backendUrl + '/api/auth/logout')

            if (data.success) {
                setLoggedIn(false)
                toast(data.message)
                navigate('/');
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex items-center justify-between p-3 px-4 md:px-12 border-b  border-gray-200'>
            <p onClick={() => navigate('/')} className='text-xl  md:text-3xl font-[Outfit] cursor-pointer select-none'>R<span className=''>
                <i className="fa-brands fa-hornbill text-lg text-purple-600 font-bold "></i>yalAuth</span></p>



            {user && loggedIn ?
                <div className='relative group inline-block'>
                    <p className='text-[16px] font-medium cursor-pointer text-center rounded-full p-2 w-10 h-10
                bg-gradient-to-br from-purple-600 to-purple-900 text-white '>{user?.username[0].toUpperCase()}</p>
                    <div className='hidden group-hover:block absolute top-10 right-4 rounded-lg rounded-tr-none bg-gray-100 border border-purple-300 z-10 text-nowrap'>

                        {!verifyEmail && !user?.isVerified && <p onClick={sendVerifyOtp}
                            className='mb-2 hover:bg-purple-200 transition-all ease-in-out font-normal cursor-pointer py-1 px-4'>Verify Account</p>}

                        <p onClick={userLogOut} className='hover:bg-purple-200 transition-all ease-in-out font-normal cursor-pointer py-1 px-4'>Logout</p>
                    </div>
                </div> :
                <button
                    onClick={() => navigate('/login')}
                    className='bg-gradient-to-br from-purple-600 to-purple-900 text-white border-none 
         transition-all ease-in-out hover:bg-gradient-to-br hover:from-300-600 hover:to-purple-500
         rounded py-1 md:py-2 px-4 md:px-6 font-[Outfit] font-medium text-[16px] cursor-pointer'>
                    Login
                </button>}
        </div>
    )
}

export default Navbar
