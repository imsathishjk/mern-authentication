import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-screen backdrop-blur-2xl fixed flex items-center justify-center gap-5'>
            <div className='text-lg font-medium w-8 h-8 border-4 border-purple-300 border-t-purple-500 rounded-full animate-spin transition-all ease-linear'></div>
        </div>
    )
}

export default Loader
