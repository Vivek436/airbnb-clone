import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { ListingDataContext } from '../Context/ListingContext'
import axios from 'axios'
import Card from '../Component/Card'

function MyListing() {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const [myListings, setMyListings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                setLoading(true)
                const result = await axios.get(`${serverUrl}/api/listing/get`, { withCredentials: true })
                // Filter listings by current user
                const userListings = result.data.filter(listing => listing.host === userData?._id)
                setMyListings(userListings)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        if (userData) {
            fetchMyListings()
        }
    }, [userData, serverUrl])

    return (
        <div className='w-[100vw] min-h-[100vh] bg-white relative'>
            <div
                className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center z-10"
                onClick={() => navigate("/")}
            >
                <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
            </div>

            <div className='w-[100%] pt-[100px] pb-[50px] px-[20px] flex flex-col items-center'>
                <h1 className='text-[30px] md:text-[40px] font-semibold text-[black] mb-[10px]'>My Listings</h1>
                <p className='text-[18px] text-gray-600 mb-[40px]'>Manage your property listings</p>

                {loading ? (
                    <div className='text-[20px] text-gray-500'>Loading...</div>
                ) : myListings.length > 0 ? (
                    <div className='w-[100%] max-w-[1400px] flex items-center justify-center gap-[25px] flex-wrap'>
                        {myListings.map((list) => (
                            <Card 
                                key={list._id}
                                id={list._id}
                                listing={list} 
                                title={list.title} 
                                landmark={list.landMark} 
                                city={list.city} 
                                image1={list.image1} 
                                image2={list.image2} 
                                image3={list.image3} 
                                rent={list.rent} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
                        <p className='text-[20px] text-gray-500'>You haven't listed any properties yet</p>
                        <button 
                            className='px-[50px] py-[10px] text-[white] bg-[red] text-[18px] rounded-lg hover:bg-[#d63030] transition-colors'
                            onClick={() => navigate('/listingpage1')}
                        >
                            List Your First Property
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyListing