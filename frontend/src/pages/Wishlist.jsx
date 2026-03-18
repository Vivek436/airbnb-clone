import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong, FaHeart } from "react-icons/fa6"
import { WishlistContext } from '../Context/WishlistContext'
import { userDataContext } from '../Context/UserContext'
import Card from '../Component/Card'

function Wishlist() {
    const navigate = useNavigate()
    const { wishlist } = useContext(WishlistContext)
    const { userData } = useContext(userDataContext)

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
                <div className='flex items-center gap-[15px] mb-[10px]'>
                    <FaHeart className='w-[35px] h-[35px] text-[#FF385C]' />
                    <h1 className='text-[30px] md:text-[40px] font-semibold text-[black]'>My Wishlist</h1>
                </div>
                <p className='text-[18px] text-gray-600 mb-[40px]'>
                    {wishlist.length} {wishlist.length === 1 ? 'property' : 'properties'} saved
                </p>

                {wishlist.length > 0 ? (
                    <div className='w-[100%] max-w-[1400px] flex flex-wrap items-center justify-center gap-[25px]'>
                        {wishlist.map((listing) => (
                            <Card 
                                key={listing._id} 
                                id={listing._id} 
                                listing={listing} 
                                title={listing.title} 
                                landmark={listing.landMark} 
                                city={listing.city} 
                                image1={listing.image1} 
                                image2={listing.image2} 
                                image3={listing.image3} 
                                rent={listing.rent} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
                        <FaHeart className='w-[80px] h-[80px] text-gray-300' />
                        <p className='text-[24px] text-gray-600 font-semibold'>Your wishlist is empty</p>
                        <p className='text-[16px] text-gray-500 text-center max-w-[400px]'>
                            Start adding properties to your wishlist by clicking the heart icon on listings
                        </p>
                        <button 
                            className='px-[50px] py-[12px] text-[white] bg-[red] text-[18px] rounded-lg hover:bg-[#d63030] transition-colors mt-[20px]'
                            onClick={() => navigate('/')}
                        >
                            Explore Properties
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
