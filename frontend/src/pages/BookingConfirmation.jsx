import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa"

function BookingConfirmation() {
    const navigate = useNavigate()
    const location = useLocation()
    const bookingData = location.state?.bookingData
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)

    if (!bookingData) {
        navigate('/')
        return null
    }

    const handleSubmitRating = () => {
        // You can add rating submission logic here
        navigate('/')
    }

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-100 flex items-center justify-center p-[20px] relative'>
            <button
                className='absolute top-[20px] right-[20px] px-[30px] py-[12px] bg-[red] text-white text-[16px] rounded-lg hover:bg-[#d63030] transition-colors'
                onClick={() => navigate('/')}
            >
                Back to Home
            </button>

            <div className='flex flex-col gap-[20px] max-w-[700px] w-[100%]'>
                {/* Booking Confirmed Card */}
                <div className='bg-white rounded-lg p-[40px] flex flex-col items-center shadow-lg'>
                    <FaCheckCircle className='w-[80px] h-[80px] text-green-600 mb-[20px]' />
                    <h1 className='text-[28px] font-semibold text-gray-800 mb-[30px]'>Booking Confirmed</h1>
                    
                    <div className='w-[100%] flex flex-col gap-[15px]'>
                        <div className='flex justify-between items-center py-[10px] border-b border-gray-200'>
                            <span className='text-[16px] text-gray-600'>Booking Id :</span>
                            <span className='text-[16px] font-medium text-gray-800'>{bookingData._id}</span>
                        </div>
                        
                        <div className='flex justify-between items-center py-[10px] border-b border-gray-200'>
                            <span className='text-[16px] text-gray-600'>Owner Details :</span>
                            <span className='text-[16px] font-medium text-gray-800'>{bookingData.host?.email || 'N/A'}</span>
                        </div>
                        
                        <div className='flex justify-between items-center py-[10px] border-b border-gray-200'>
                            <span className='text-[16px] text-gray-600'>Check-in :</span>
                            <span className='text-[16px] font-medium text-gray-800'>
                                {new Date(bookingData.checkIn).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <div className='flex justify-between items-center py-[10px] border-b border-gray-200'>
                            <span className='text-[16px] text-gray-600'>Check-out :</span>
                            <span className='text-[16px] font-medium text-gray-800'>
                                {new Date(bookingData.checkOut).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <div className='flex justify-between items-center py-[10px]'>
                            <span className='text-[16px] text-gray-600'>Total Rent :</span>
                            <span className='text-[18px] font-semibold text-gray-800'>₹{bookingData.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Rating Card */}
                <div className='bg-white rounded-lg p-[40px] flex flex-col items-center shadow-lg'>
                    <h2 className='text-[20px] font-semibold text-gray-800 mb-[15px]'>
                        {rating > 0 ? `${rating} out of 5 Rating` : '0 out of 5 Rating'}
                    </h2>
                    
                    <div className='flex gap-[10px] mb-[25px]'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className='text-[35px] transition-colors cursor-pointer'
                            >
                                <span className={`${
                                    star <= (hoveredRating || rating) 
                                        ? 'text-black' 
                                        : 'text-gray-300'
                                }`}>
                                    ★
                                </span>
                            </button>
                        ))}
                    </div>
                    
                    <button
                        className='px-[80px] py-[12px] bg-[red] text-white text-[18px] font-semibold rounded-lg hover:bg-[#d63030] transition-colors'
                        onClick={handleSubmitRating}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingConfirmation
