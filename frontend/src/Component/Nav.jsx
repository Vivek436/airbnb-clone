import React, { useContext } from 'react'
import { useState  } from 'react';
import  { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import {GiFamilyHouse} from 'react-icons/gi';
import {MdBedroomParent} from 'react-icons/md';
import {MdOutlinePool} from 'react-icons/md';
import {GiWoodCabin} from 'react-icons/gi';
import {SiHomeassistantcommunitystore} from 'react-icons/si';
import {IoBedOutline} from 'react-icons/io5';
import {FaTreeCity} from 'react-icons/fa6';
import {BiBuildingHouse} from 'react-icons/bi';
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';



const Nav = () => {
  const [showpopup, setShowpopup] = useState(false)
  let {userData ,setUserData} =useContext(userDataContext)
  let navigate = useNavigate();
  let {serverUrl} = useContext(authDataContext)
  const handleLogOut = async () => {
    try {
      let result = await axios.post( serverUrl + "/api/auth/logout", {withCredentials:true})
      setUserData(null)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  return ( 
    <div>
      <div className='w-[100vw] min-h-[80px]
      border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between md:px-[40px]'>
        <div><img src={logo}alt="" className='w-[130px]' /></div>
      <div className='w-[35%] relative hidden md:block'>
        <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] 
        border-[#bdaba] outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City'/>
        <button className='absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]'><FiSearch className='w-[20px] h-[20px] text-[white]' /></button>
      </div>
      <div className='flex items-center justify-center gap-[10px] relative'>
        <span className='text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block'>List your home</span>
        <button className='px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px]
         border-[#8d8c8c] rounded-[50px] hover:shadow-lg' onClick={()=>setShowpopup(prev=>!prev)}>
          <span>
            <GiHamburgerMenu className='w-[20px] h-[20px]'/>
            </span>
           { userData == null &&  <span>
          <CgProfile className='w-[23px] h-[23px]' />
            </span>}
            { userData != null &&<span className='w-[30px] h-[30px] bg-[#080808] text-[white]
             rounded-full flex items-center justify-center'>{userData?.name.slice(0,1)}</span>}
          </button>
          { showpopup && <div className='w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px]
          border-[#aaa9a9] z-10 rounded-lg md:right-[10%]'>
            <ul className='w-[100%] h-[100%]
            text-[17px] flex items-start justify-around
            flex-col py-[10px]'>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]'onClick={()=>navigate("/login")}>Login</li>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]' onClick={handleLogOut}>Logout</li>
            <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]'>List your Home</li>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]'>My Listing</li>
            <li className='w-[100%] px-[15px] py-[10px] cursor-pointer hover:bg-[#f4f3f3]'>Check Booking</li>
            </ul>

          </div>}
         
      </div>
      
      </div>
      <div className='w-[100%] h-[60px] flex items-center justify-center block md:hidden'>
       <div className='w-[80%] relative '>
        <input type="text" className='w-[100%] px-[30px] py-[10px] border-[2px] 
        border-[#bdaba] outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City'/>
        <button className='absolute p-[10px] rounded-[50px] bg-[red] right-[3%] top-[5px]'><FiSearch className='w-[20px] h-[20px] text-[white]' /></button>
      </div>
      </div>
      <div className='w-[100vw] h-[85px] bg-white flex items-start
       justify-center cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px] pt-[22px]  '>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <MdWhatshot className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <GiFamilyHouse className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <MdBedroomParent className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <GiWoodCabin className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <SiHomeassistantcommunitystore className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <IoBedOutline className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap'>
        <FaTreeCity className='w-[30px] h-[30px] text-black] '/>
        <h3>Farm House</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap'>
        <MdOutlinePool className='w-[30px] h-[30px] text-black] '/>
        <h3>Pool House</h3>
        </div>
        <div className='flex items-center justify-center flex-col
        hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
        <BiBuildingHouse className='w-[30px] h-[30px] text-black]'/>
        <h3>Trending</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Nav
