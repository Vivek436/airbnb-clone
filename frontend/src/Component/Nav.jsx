import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from 'react-icons/gi';
import { MdBedroomParent } from 'react-icons/md';
import { MdOutlinePool } from 'react-icons/md';
import { GiWoodCabin } from 'react-icons/gi';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { IoBedOutline } from 'react-icons/io5';
import { FaTreeCity } from 'react-icons/fa6';
import { BiBuildingHouse } from 'react-icons/bi';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { ListingDataContext } from '../Context/ListingContext';



const Nav = () => {
  const [showpopup, setShowpopup] = useState(false)
  let { userData, setUserData } = useContext(userDataContext)
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext)
  let { filterByCategory, selectedCategory, searchListings, searchQuery, setSearchQuery, allListings } = useContext(ListingDataContext)
  const [localSearch, setLocalSearch] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  
  const handleLogOut = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
      setUserData(null)
      console.log(result)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleCategory = (category) => {
    if (selectedCategory === category) {
      // If clicking the same category, reset to show all
      filterByCategory("")
    } else {
      filterByCategory(category)
    }
  }
  
  const handleReset = () => {
    filterByCategory("")
    setLocalSearch("")
    setSearchQuery("")
    setShowSearchResults(false)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    searchListings(localSearch)
    setShowSearchResults(false)
    navigate("/")
  }
  
  const handleSelectResult = (listing) => {
    setShowSearchResults(false)
    setLocalSearch("")
    navigate(`/viewcard/${listing._id}`)
  }
  
  // Automatic search as user types
  useEffect(() => {
    if (localSearch.trim() === "") {
      setShowSearchResults(false)
      setSearchResults([])
      searchListings("")
      return
    }
    
    const timer = setTimeout(() => {
      const searchLower = localSearch.toLowerCase()
      const results = allListings.filter((list) => {
        return (
          list.city?.toLowerCase().includes(searchLower) ||
          list.landMark?.toLowerCase().includes(searchLower) ||
          list.title?.toLowerCase().includes(searchLower)
        )
      })
      setSearchResults(results.slice(0, 5)) // Show max 5 results
      setShowSearchResults(results.length > 0)
      searchListings(localSearch)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [localSearch])
  
  return ( 
    <div className='fixed top-0 bg-[white] z-50 w-[100vw]'>
      <div className='w-[100vw] min-h-[80px]
      border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between md:px-[40px] '>
        <div><img src={logo}alt="" className='w-[130px]' /></div>
      <div className='w-[35%] relative hidden md:block'>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdaba] outline-none overflow-auto rounded-[30px] text-[17px]' 
            placeholder='Search by City, Location or Title'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => localSearch && setShowSearchResults(true)}
          />
          <button type="submit" className='absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]'>
            <FiSearch className='w-[20px] h-[20px] text-[white]' />
          </button>
        </form>
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className='absolute top-[55px] left-0 w-[100%] bg-white border-[1px] border-gray-300 rounded-lg shadow-2xl z-50 max-h-[400px] overflow-auto'>
            {searchResults.map((listing) => (
              <div 
                key={listing._id}
                className='flex items-center gap-[15px] p-[15px] hover:bg-gray-100 cursor-pointer border-b-[1px] border-gray-200'
                onClick={() => handleSelectResult(listing)}
              >
                <img 
                  src={listing.image1} 
                  alt={listing.title}
                  className='w-[80px] h-[60px] object-cover rounded-lg'
                />
                <div className='flex-1'>
                  <h3 className='text-[16px] font-semibold text-gray-800'>
                    In {listing.landMark?.toUpperCase()}, {listing.city?.toUpperCase()}
                  </h3>
                  <p className='text-[14px] text-gray-600'>{listing.title?.toUpperCase()}</p>
                  <p className='text-[14px] font-semibold text-[#FF385C]'>₹{listing.rent}/day</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex items-center justify-center gap-[10px] relative'>
        <span className='text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block' onClick={() => navigate("/listingpage1")}>List your home</span>
        <button className='px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg' onClick={() => setShowpopup(prev => !prev)}>
          <span>
            <GiHamburgerMenu className='w-[20px] h-[20px]'/>
          </span>
          {userData == null && <span>
            <CgProfile className='w-[23px] h-[23px]' />
          </span>}
            {userData != null && <span className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center'>{userData?.name.slice(0, 1)}</span>}
          </button>
          {showpopup && <div className='w-[220px] h-[290px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg md:right-[10%]'>
            <ul className='w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]'>
            {!userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/login"); setShowpopup(false) }}>Login</li>}
            {!userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/signup"); setShowpopup(false) }}>Sign Up</li>}
            {userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { handleLogOut(); setShowpopup(false) }}>Logout</li>}
            <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/listingpage1"); setShowpopup(false) }}>List your Home</li>
            {userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/host-dashboard"); setShowpopup(false) }}>Host Dashboard </li>}
            {userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/mylisting"); setShowpopup(false) }}>My Listing</li>}
            {userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/mybookings"); setShowpopup(false) }}>My Bookings</li>}
            {userData && <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={() => { navigate("/wishlist"); setShowpopup(false) }}>Wishlist</li>}
            </ul>

          </div>}
         
      </div>
      
      </div>
      <div className='w-[100%] h-[60px] flex items-center justify-center md:hidden'>
       <div className='w-[80%] relative '>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            className='w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdaba] outline-none overflow-auto rounded-[30px] text-[17px]' 
            placeholder='Search by City, Location or Title'
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onFocus={() => localSearch && setShowSearchResults(true)}
          />
          <button type="submit" className='absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]'>
            <FiSearch className='w-[20px] h-[20px] text-[white]' />
          </button>
        </form>
        
        {/* Search Results Dropdown - Mobile */}
        {showSearchResults && searchResults.length > 0 && (
          <div className='absolute top-[55px] left-0 w-[100%] bg-white border-[1px] border-gray-300 rounded-lg shadow-2xl z-50 max-h-[400px] overflow-auto'>
            {searchResults.map((listing) => (
              <div 
                key={listing._id}
                className='flex items-center gap-[15px] p-[15px] hover:bg-gray-100 cursor-pointer border-b-[1px] border-gray-200'
                onClick={() => handleSelectResult(listing)}
              >
                <img 
                  src={listing.image1} 
                  alt={listing.title}
                  className='w-[80px] h-[60px] object-cover rounded-lg'
                />
                <div className='flex-1'>
                  <h3 className='text-[14px] font-semibold text-gray-800'>
                    In {listing.landMark?.toUpperCase()}, {listing.city?.toUpperCase()}
                  </h3>
                  <p className='text-[13px] text-gray-600'>{listing.title?.toUpperCase()}</p>
                  <p className='text-[13px] font-semibold text-[#FF385C]'>₹{listing.rent}/day</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <div className='w-[100vw] h-[85px] bg-white flex items-start justify-center cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px] pt-[22px] hide-scrollbar'>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "" ? "border-b-[2px] border-[#000]" : ""}`} onClick={handleReset}>
          <MdWhatshot className='w-[30px] h-[30px] text-black]'/>
          <h3>All</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "villa" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("villa")}>
          <GiFamilyHouse className='w-[30px] h-[30px] text-black]'/>
          <h3>Villa</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap ${selectedCategory === "farmhouse" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("farmhouse")}>
          <FaTreeCity className='w-[30px] h-[30px] text-black]'/>
          <h3>Farm House</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap ${selectedCategory === "poolhouse" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("poolhouse")}>
          <MdOutlinePool className='w-[30px] h-[30px] text-black] '/>
          <h3>Pool House</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "rooms" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("rooms")}>
          <MdBedroomParent className='w-[30px] h-[30px] text-black] '/>
          <h3>Rooms</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "flat" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("flat")}>
          <BiBuildingHouse className='w-[30px] h-[30px] text-black]'/>
          <h3>Flat</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "pg" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("pg")}>
          <IoBedOutline className='w-[30px] h-[30px] text-black]'/>
          <h3>PG</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "cabin" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("cabin")}>
          <GiWoodCabin className='w-[30px] h-[30px] text-black]'/>
          <h3>Cabin</h3>
        </div>
        <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${selectedCategory === "shops" ? "border-b-[2px] border-[#000]" : ""}`} onClick={() => handleCategory("shops")}>
          <SiHomeassistantcommunitystore className='w-[30px] h-[30px] text-black]'/>
          <h3>Shops</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Nav
