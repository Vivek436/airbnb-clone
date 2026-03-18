import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaHome, FaCalendarCheck, FaDollarSign, FaStar } from "react-icons/fa"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'

function HostDashboard() {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [stats, setStats] = useState({
        totalListings: 0,
        totalBookings: 0,
        totalRevenue: 0,
        activeBookings: 0
    })
    const [recentBookings, setRecentBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                
                // Fetch host's listings
                const listingsResult = await axios.get(`${serverUrl}/api/listing/get`, { withCredentials: true })
                const hostListings = listingsResult.data.filter(listing => listing.host === userData._id)
                
                // Fetch host's bookings
                const bookingsResult = await axios.get(`${serverUrl}/api/booking/host-bookings`, { withCredentials: true })
                const hostBookings = bookingsResult.data
                
                // Calculate statistics
                const totalRevenue = hostBookings
                    .filter(b => b.status === 'confirmed')
                    .reduce((sum, booking) => sum + booking.totalPrice, 0)
                
                const activeBookings = hostBookings.filter(b => b.status === 'confirmed').length
                
                setStats({
                    totalListings: hostListings.length,
                    totalBookings: hostBookings.length,
                    totalRevenue: totalRevenue,
                    activeBookings: activeBookings
                })
                
                setRecentBookings(hostBookings.slice(0, 5))
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (userData) {
            fetchDashboardData()
        }
    }, [userData, serverUrl])

    if (!userData) {
        navigate('/login')
        return null
    }

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-50 relative'>
            <div
                className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center z-10"
                onClick={() => navigate("/")}
            >
                <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
            </div>

            <div className='w-[100%] pt-[100px] pb-[50px] px-[20px] flex flex-col items-center'>
                <h1 className='text-[30px] md:text-[40px] font-semibold text-[black] mb-[10px]'>Host Dashboard</h1>
                <p className='text-[18px] text-gray-600 mb-[40px]'>Welcome back, {userData.name}!</p>

                {loading ? (
                    <div className='text-[20px] text-gray-500'>Loading...</div>
                ) : (
                    <>
                        {/* Statistics Cards */}
                        <div className='w-[100%] max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[40px]'>
                            {/* Total Listings */}
                            <div className='bg-white rounded-lg p-[25px] shadow-md hover:shadow-xl transition-shadow'>
                                <div className='flex items-center justify-between mb-[15px]'>
                                    <FaHome className='w-[35px] h-[35px] text-[#FF385C]' />
                                    <span className='text-[14px] text-gray-500 font-medium'>Total Listings</span>
                                </div>
                                <h2 className='text-[36px] font-bold text-gray-800'>{stats.totalListings}</h2>
                                <p className='text-[14px] text-gray-500 mt-[5px]'>Properties listed</p>
                            </div>

                            {/* Total Bookings */}
                            <div className='bg-white rounded-lg p-[25px] shadow-md hover:shadow-xl transition-shadow'>
                                <div className='flex items-center justify-between mb-[15px]'>
                                    <FaCalendarCheck className='w-[35px] h-[35px] text-green-600' />
                                    <span className='text-[14px] text-gray-500 font-medium'>Total Bookings</span>
                                </div>
                                <h2 className='text-[36px] font-bold text-gray-800'>{stats.totalBookings}</h2>
                                <p className='text-[14px] text-gray-500 mt-[5px]'>All time bookings</p>
                            </div>

                            {/* Total Revenue */}
                            <div className='bg-white rounded-lg p-[25px] shadow-md hover:shadow-xl transition-shadow'>
                                <div className='flex items-center justify-between mb-[15px]'>
                                    <FaDollarSign className='w-[35px] h-[35px] text-yellow-600' />
                                    <span className='text-[14px] text-gray-500 font-medium'>Total Revenue</span>
                                </div>
                                <h2 className='text-[36px] font-bold text-gray-800'>₹{stats.totalRevenue.toLocaleString()}</h2>
                                <p className='text-[14px] text-gray-500 mt-[5px]'>Total earnings</p>
                            </div>

                            {/* Active Bookings */}
                            <div className='bg-white rounded-lg p-[25px] shadow-md hover:shadow-xl transition-shadow'>
                                <div className='flex items-center justify-between mb-[15px]'>
                                    <FaStar className='w-[35px] h-[35px] text-blue-600' />
                                    <span className='text-[14px] text-gray-500 font-medium'>Active Bookings</span>
                                </div>
                                <h2 className='text-[36px] font-bold text-gray-800'>{stats.activeBookings}</h2>
                                <p className='text-[14px] text-gray-500 mt-[5px]'>Currently active</p>
                            </div>
                        </div>

                        {/* Recent Bookings */}
                        <div className='w-[100%] max-w-[1200px] bg-white rounded-lg p-[30px] shadow-md'>
                            <h2 className='text-[24px] font-semibold text-gray-800 mb-[20px]'>Recent Bookings</h2>
                            
                            {recentBookings.length > 0 ? (
                                <div className='flex flex-col gap-[15px]'>
                                    {recentBookings.map((booking) => (
                                        <div key={booking._id} className='flex items-center justify-between p-[15px] bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                                            <div className='flex items-center gap-[15px]'>
                                                <img 
                                                    src={booking.listing.image1} 
                                                    alt={booking.listing.title}
                                                    className='w-[60px] h-[60px] object-cover rounded-lg'
                                                />
                                                <div>
                                                    <h3 className='text-[16px] font-semibold text-gray-800'>{booking.listing.title}</h3>
                                                    <p className='text-[14px] text-gray-600'>
                                                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-[18px] font-semibold text-gray-800'>₹{booking.totalPrice}</p>
                                                <span className={`text-[14px] font-medium ${
                                                    booking.status === 'confirmed' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {booking.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-[16px] text-gray-500 text-center py-[20px]'>No bookings yet</p>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className='w-[100%] max-w-[1200px] mt-[30px] flex flex-wrap gap-[15px] justify-center'>
                            <button
                                className='px-[30px] py-[12px] bg-[#FF385C] text-white text-[16px] font-semibold rounded-lg hover:bg-[#E31C5F] transition-colors'
                                onClick={() => navigate('/listingpage1')}
                            >
                                Add New Listing
                            </button>
                            <button
                                className='px-[30px] py-[12px] bg-white text-gray-800 text-[16px] font-semibold rounded-lg border-[2px] border-gray-300 hover:border-gray-400 transition-colors'
                                onClick={() => navigate('/mylisting')}
                            >
                                View My Listings
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default HostDashboard
