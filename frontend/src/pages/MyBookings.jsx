import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { showSuccess, showError } from '../utils/showToast'

function MyBookings() {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const result = await axios.get(`${serverUrl}/api/booking/my-bookings`, { withCredentials: true })
                setBookings(result.data)
            } catch (error) {
                console.log(error)
                showError("Failed to load bookings")
            } finally {
                setLoading(false)
            }
        }

        if (userData) {
            fetchBookings()
        }
    }, [userData, serverUrl])

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return

        try {
            await axios.put(`${serverUrl}/api/booking/cancel/${bookingId}`, {}, { withCredentials: true })
            setBookings(bookings.filter(b => b._id !== bookingId))
            showSuccess("Booking cancelled successfully")
        } catch (error) {
            console.log(error)
            showError("Failed to cancel booking")
        }
    }

    return (
        <div className='w-[100vw] min-h-[100vh] bg-white relative'>
            <div
                className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center z-10"
                onClick={() => navigate("/")}
            >
                <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
            </div>

            <div className='w-[100%] pt-[100px] pb-[50px] px-[20px] flex flex-col items-center'>
                <h1 className='text-[30px] md:text-[40px] font-semibold text-[black] mb-[10px]'>My Bookings</h1>
                <p className='text-[18px] text-gray-600 mb-[40px]'>View and manage your bookings</p>

                {loading ? (
                    <div className='text-[20px] text-gray-500'>Loading...</div>
                ) : bookings.length > 0 ? (
                    <div className='w-[100%] max-w-[1200px] flex flex-col gap-[20px]'>
                        {bookings.map((booking) => (
                            <div key={booking._id} className='w-[100%] bg-white border-[2px] border-gray-300 rounded-lg p-[20px] flex flex-col md:flex-row gap-[20px]'>
                                <img 
                                    src={booking.listing.image1} 
                                    alt={booking.listing.title}
                                    className='w-[100%] md:w-[250px] h-[200px] object-cover rounded-lg'
                                />
                                <div className='flex-1 flex flex-col gap-[10px]'>
                                    <h3 className='text-[22px] font-semibold'>{booking.listing.title}</h3>
                                    <p className='text-[16px] text-gray-600'>{booking.listing.city}, {booking.listing.landMark}</p>
                                    <p className='text-[16px]'>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                                    <p className='text-[16px]'>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                                    <p className='text-[16px]'>Total Days: {booking.totalDays}</p>
                                    <p className='text-[18px] font-semibold'>Total Price: ₹{booking.totalPrice}</p>
                                    <p className={`text-[16px] font-semibold ${
                                        booking.status === 'confirmed' ? 'text-green-600' : 
                                        booking.status === 'cancelled' ? 'text-red-600' : 
                                        'text-yellow-600'
                                    }`}>
                                        Status: {booking.status.toUpperCase()}
                                    </p>
                                    {booking.status === 'confirmed' && (
                                        <button
                                            className='px-[30px] py-[8px] text-[white] bg-[red] text-[16px] rounded-lg hover:bg-[#d63030] transition-colors w-fit'
                                            onClick={() => handleCancelBooking(booking._id)}
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
                        <p className='text-[20px] text-gray-500'>You haven't made any bookings yet</p>
                        <button 
                            className='px-[50px] py-[10px] text-[white] bg-[red] text-[18px] rounded-lg hover:bg-[#d63030] transition-colors'
                            onClick={() => navigate('/')}
                        >
                            Browse Properties
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookings
