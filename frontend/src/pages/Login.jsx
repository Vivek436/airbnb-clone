import React, { useContext } from 'react'
 import { IoMdEye } from "react-icons/io";
 import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';


const Login = () => {
    const [show, setshow] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let {userData, setUserData} = useContext(userDataContext)
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let navigate = useNavigate();
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,   // ✅ correct URL
        {  email, password },
        { withCredentials: true }
      );
      setUserData(result.data)
      navigate("/")
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
       <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate('/')}><FaLongArrowAltLeft className='h-[25px] text-[white] w-[25px]'/></div>
            
          <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleLogin}>
            <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>
            
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
            <label htmlFor="email" className='text-[20px]'>Email</label>
            <input type="text" id='email' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className=' relative w-[90%] flex items-start justify-start flex-col gap-[10px] '>
            <label htmlFor="password" className='text-[20px]'>Password</label>
            <input type={show?"text":"password"} id='password'  className=' w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            {!show && <IoMdEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>{
              setshow(prev=>!prev)
            }}/>}
           { show && <IoEyeOff  className='w-[22px] h-[22px] absolute right-[12%] cursor-pointer bottom-[10px]' onClick={()=>{
              setshow(prev=>!prev)
            }}/>}
            </div>
            <button className='px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg'>Login</button>
              <p className='text-[18px]'>Create new Account<span className='text-[19px] text-[red] cursor-pointer' onClick={()=>navigate('/signup')}>SignUp</span></p>

     
          </form>
        </div>
  )
}

export default Login
