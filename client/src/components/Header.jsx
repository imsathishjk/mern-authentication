import React, { useContext } from 'react'
import AppContext from '../context/AppContext';

const Header = () => {
    const { user, loggedIn } = useContext(AppContext);
    return (
        <div className='mt-12 p-4 px-4 sm:px-8 md:px-12 w-full mb-12'>
            <div className='flex flex-col md:flex-row items-center gap-12'>
                <div className='flex flex-col items-start gap-5'>
                    <h1 className='font-medium text-xl md:text-3xl '>Hey, <span className='text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-purple-900'>{user && loggedIn ? user.username : "Buddy"}</span></h1>
                    <p className='leading-7 md:leading-10 lg:leading-loose text-[16px] md:text-lg'>We’re excited to have you back.

                        This is your personalized space —
                        Here, you can manage your account, explore new features, and make the most of your experience.
                    </p>
                    <p className='font-medium'>🔐 You’re securely logged in. </p>
                    <p className='font-medium'>💡 Start exploring or pick up where you left off.</p>
                </div>
                <div className='max-w-sm flex flex-col gap-5 md:gap-12 lg:gap-16'>
                    <div className='flex flex-col gap-2 items-center p-4 rounded-md shadow-md
                        bg-gradient-to-b from-slate-200 to-slate-300'>
                        <h1 className='text-[18px] font-medium text-purple-600 flex flex-col items-center'><i className="fa-solid fa-mask"></i> Seamless Sign-In</h1>
                        <p className=''>Effortless access with a touch of class.
                            Experience smooth, secure login that feels as good as it looks — because your first click should be flawless.

                        </p>
                    </div>
                    <div className='flex flex-col gap-2 items-center p-4 rounded-md shadow-md
                        bg-gradient-to-b from-slate-200 to-slate-300'>
                        <h1 className='text-[18px] font-medium text-purple-600 flex flex-col items-center'><i className="fa-solid fa-shield-halved"></i> Elegant Security</h1>
                        <p className=''>Where beauty meets protection.
                            Enjoy refined aesthetics without compromising on modern authentication standards like JWT, OAuth, and password encryption.</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center p-4 rounded-md shadow-md
                        bg-gradient-to-b from-slate-200 to-slate-300'>
                        <h1 className='text-[18px] font-medium text-purple-600 flex flex-col items-center'><i className="fa-solid fa-handshake"></i>  Personalized Welcome</h1>
                        <p className=''>Your gateway, your style.
                            After login, you're greeted with a chic and customized landing space designed to match your taste and identity.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header;
