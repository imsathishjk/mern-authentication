import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



const Login = () => {
    const { currState, setCurrState, backendUrl, setLoggedIn, getUserData, loading, setLoading } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)



    const navigate = useNavigate();

    const userHandle = async (e) => {
        try {
            e.preventDefault();
            if (currState === 'Sign Up') {
                setLoading(true)
                const { data } = await axios.post(backendUrl + '/api/auth/register', { username, email, password }, { withCredentials: true });
                if (data.success) {
                    setLoggedIn(true)
                    getUserData()
                    setLoading(false)
                    navigate('/')
                    toast(data.message)
                } else {
                    toast.error(data.message)
                    setLoading(false)
                    console.log(data);
                }
            } else {
                setLoading(true)

                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password }, { withCredentials: true });
                if (data.success) {
                    setLoggedIn(true)
                    getUserData()
                    setLoading(false)
                    navigate('/')
                    toast(data.message)
                } else {
                    toast.error(data.message)
                    setLoading(false)
                    console.log(data)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <>
            {loading ? <Loader /> : <div className='h-screen flex justify-center items-center max-w-lg m-auto'>
                <form onSubmit={userHandle} className='relative bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 md:p-8 rounded-md flex flex-col w-[95%] mx-auto'>
                    <h1 className='text-2xl font-medium text-center mt-5'>{currState}</h1>
                    {currState === 'Sign Up' ?

                        <div className='mt-8'>
                            <p className='text-sm md:text-lg text-purple-300 mb-3'>UserName</p>
                            <div className='flex justify-between gap-2 items-center border-2 border-purple-300 rounded-md py-2 px-3'>
                                <input className='w-full outline-none placeholder:text-sm border-purple-300'
                                    onChange={(e) => setUsername(e.target.value)} type="text" placeholder='eg:JohnDoe' value={username} required />
                                <i className="fa-solid fa-user text-sm"></i>
                            </div>
                        </div> : ''}
                    <p className='text-sm md:text-lg text-purple-300 my-3'>Email</p>
                    <div className='flex justify-between gap-2 items-center border-2 border-purple-300 rounded-md py-2 px-3'>
                        <input className='w-full outline-none  placeholder:text-sm'
                            onChange={(e) => setEmail(e.target.value)} type="email" placeholder='eg:johndoe@gmail.com' value={email} required />
                        <i className="fa-solid fa-envelope  text-sm"></i>
                    </div>
                    <p className='text-sm md:text-lg text-purple-300 my-3'>Password</p>

                    <div className='flex justify-between gap-2 items-center border-2 border-purple-300 rounded-md py-2 px-3'>
                        <input className='outline-none placeholder:text-sm'
                            onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'} placeholder='john@1234' required />

                        {showPassword ? <i className="fa-solid fa-eye-slash text-sm cursor-pointer" onClick={() => setShowPassword(false)}></i> : <i onClick={() => setShowPassword(true)} className="fa-solid fa-eye text-sm cursor-pointer"></i>}
                    </div>
                    <button type='submit' className='py-2 px-5 text-lg font-medium my-5 cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 rounded-md'>{currState}</button>
                    {currState === 'Login' ? <p className='cursor-pointer text-purple-300 text-[14px] w-fit mb-2'
                        onClick={() => navigate('/reset-password')}
                    >Forgot Password?</p> : " "}
                    <div className='flex gap-1 items-center'>
                        <input type="checkbox" required />
                        <p>I accept terms & conditions</p>
                    </div>
                    {
                        currState === 'Sign Up' ? <p className='text-sm font-medium mt-2'>Already have an account? <span onClick={() => setCurrState('Login')} className='cursor-pointer text-purple-300 text-lg ml-1'>Login</span></p> :
                            <p className='text-sm font-medium mt-2'>Don't have an accout? <span onClick={() => setCurrState('Sign Up')} className='cursor-pointer text-purple-300 text-[16px] md:text-lg ml-1'>Create an account</span></p>
                    }
                </form>
            </div>
            }

        </>
    )
}

export default Login;
