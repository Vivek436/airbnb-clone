import React, { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { ListingDataContext } from '../Context/ListingContext'
import { WishlistContext } from '../Context/WishlistContext'
import axios from 'axios'
import { showSuccess, showError } from '../utils/showToast'

function Card({title, landmark, image1, image2, image3, rent, city, id, listing}) {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const { updateListingInContext } = useContext(ListingDataContext)
    const { isInWishlist, toggleWishlist } = useContext(WishlistContext)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [cancelling, setCancelling] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const imageContainerRef = useRef(null)
    const scrollIntervalRef = useRef(null)
    
    const isBooked = listing?.isBooked || false
    const isOwner = userData?._id === listing?.host
    const isFavorite = listing && isInWishlist ? isInWishlist(listing?._id || id) : false
    
    const handleWishlistToggle = (e) => {
        e.stopPropagation()
        if (!userData) {
            showError("Please login to add to wishlist")
            navigate('/login')
            return
        }
        const added = toggleWishlist(listing)
        if (added) {
            showSuccess("Added to wishlist")
        } else {
            showSuccess("Removed from wishlist")
        }
    }
    
    // Auto scroll images on hover
    useEffect(() => {
        if (isHovered && imageContainerRef.current) {
            const container = imageContainerRef.current
            const scrollWidth = container.scrollWidth
            const clientWidth = container.clientWidth
            let currentIndex = 0
            
            scrollIntervalRef.current = setInterval(() => {
                currentIndex = (currentIndex + 1) % 3
                setCurrentImageIndex(currentIndex)
                container.scrollTo({
                    left: currentIndex * clientWidth,
                    behavior: 'smooth'
                })
            }, 2000)
        } else {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current)
            }
            setCurrentImageIndex(0)
            if (imageContainerRef.current) {
                imageContainerRef.current.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }
        
        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current)
            }
        }
    }, [isHovered])
    
    const handleCancelBooking = async (e) => {
        e.stopPropagation()
        setCancelling(true)
        try {
            // Get the booking for this listing
            const bookingsResult = await axios.get(`${serverUrl}/api/booking/host-bookings`, { withCredentials: true })
            const listingBooking = bookingsResult.data.find(b => b.listing._id === listing._id && b.status === 'confirmed')
            
            if (!listingBooking) {
                showError("No active booking found")
                return
            }

            await axios.put(`${serverUrl}/api/booking/cancel/${listingBooking._id}`, {}, { withCredentials: true })
            
            // Update listing to show it's not booked
            const updatedListing = { ...listing, isBooked: false }
            updateListingInContext(updatedListing)
            
            showSuccess("Booking cancelled successfully!")
            setShowCancelModal(false)
        } catch (error) {
            console.log(error)
            showError(error.response?.data?.message || "Failed to cancel booking")
        } finally {
            setCancelling(false)
        }
    }
    
    return (
        <>
            <div 
                className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white' 
                onClick={() => navigate(`/viewcard/${id || listing?._id}`)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Wishlist Heart Icon */}
                <div 
                    className='absolute top-[10px] left-[10px] z-20 bg-white/80 backdrop-blur-sm rounded-full p-[8px] hover:bg-white transition-all'
                    onClick={handleWishlistToggle}
                >
                    {isFavorite ? (
                        <FaHeart className='w-[20px] h-[20px] text-[#FF385C] animate-pulse' />
                    ) : (
                        <FaRegHeart className='w-[20px] h-[20px] text-gray-700 hover:text-[#FF385C] transition-colors' />
                    )}
                </div>

                {/* Booked Badge */}
                {isBooked && (
                    <div className='absolute top-[10px] right-[10px] bg-white rounded-full px-[12px] py-[6px] flex items-center gap-[5px] shadow-lg z-10'>
                        <FaCheckCircle className='text-green-600 w-[18px] h-[18px]' />
                        <span className='text-[14px] font-semibold text-green-600'>Booked</span>
                    </div>
                )}
                
                {/* Cancel Booking Button - Only for host */}
                {isBooked && isOwner && (
                    <div 
                        className='absolute top-[50px] right-[10px] bg-[#FF385C] rounded-full px-[12px] py-[6px] flex items-center gap-[5px] shadow-lg z-10 hover:bg-[#E31C5F] transition-colors'
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowCancelModal(true)
                        }}
                    >
                        <IoMdClose className='text-white w-[16px] h-[16px]' />
                        <span className='text-[13px] font-semibold text-white'>Cancel Booking</span>
                    </div>
                )}
                
                <div 
                    ref={imageContainerRef}
                    className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-t-lg overflow-auto flex hide-scrollbar relative'
                >
                    <img src={image1} alt="" className='w-[100%] flex-shrink-0 object-cover'/>
                    <img src={image2} alt="" className='w-[100%] flex-shrink-0 object-cover'/>
                    <img src={image3} alt="" className='w-[100%] flex-shrink-0 object-cover'/>
                    
                    {/* Image Indicators */}
                    <div className='absolute bottom-[10px] left-1/2 transform -translate-x-1/2 flex gap-[6px] z-10'>
                        {[0, 1, 2].map((index) => (
                            <div 
                                key={index}
                                className={`w-[6px] h-[6px] rounded-full transition-all ${
                                    currentImageIndex === index 
                                        ? 'bg-white w-[20px]' 
                                        : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className='w-[100%] h-[33%] py-[20px] px-[10px] flex flex-col gap-[2px]'>
                    <span className='w-[90%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark?.toUpperCase()}, {city?.toUpperCase()}</span>
                    <span className='text-[15px] w-[90%] text-ellipsis overflow-hidden text-nowrap text-gray-600'>{title?.toUpperCase()}</span>
                    <span className='text-[16px] font-semibold text-[#FF385C]'>₹{rent} /day</span>
                </div>
            </div>

            {/* Cancel Booking Modal */}
            {showCancelModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-[20px]"
                    onClick={(e) => {
                        e.stopPropagation()
                        setShowCancelModal(false)
                    }}
                >
                    <div 
                        className="w-[100%] max-w-[450px] h-[300px] rounded-lg overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background Image */}
                        <img 
                            src={listing?.image1 || image1} 
                            alt="listing" 
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                console.log("Image failed to load:", listing?.image1 || image1)
                                e.target.style.display = 'none'
                            }}
                        />
                        
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-[25px] px-[40px]">
                            <h2 className="text-[32px] font-bold text-white">Booking Cancel!</h2>
                            <p className="text-[18px] text-white text-center">Are you sure?</p>
                            
                            <div className="flex gap-[15px] w-[100%] max-w-[300px]">
                                <button
                                    className="flex-1 py-[12px] px-[30px] text-[white] bg-[#FF385C] text-[16px] font-semibold rounded-lg cursor-pointer hover:bg-[#E31C5F] transition-colors disabled:bg-gray-400"
                                    onClick={handleCancelBooking}
                                    disabled={cancelling}
                                >
                                    {cancelling ? "Cancelling..." : "Yes"}
                                </button>
                                <button
                                    className="flex-1 py-[12px] px-[30px] text-white bg-[#3d4a5c] text-[16px] font-semibold rounded-lg cursor-pointer hover:bg-[#2d3a4c] transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowCancelModal(false)
                                    }}
                                    disabled={cancelling}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Card