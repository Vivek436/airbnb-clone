import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50'>
            <div className='flex flex-col items-center gap-[30px] px-[20px]'>
                <h1 className='text-[120px] md:text-[180px] font-bold text-[#FF385C]'>404</h1>
                <h2 className='text-[28px] md:text-[40px] font-semibold text-gray-800 text-center'>
                    Oops! Page Not Found
                </h2>
                <p className='text-[18px] text-gray-600 text-center max-w-[500px]'>
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    className='px-[50px] py-[15px] bg-[#FF385C] text-white text-[18px] font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors'
                    onClick={() => navigate('/')}
                >
                    Go Back Home
                </button>
            </div>
        </div>
    )
}

export default NotFound
