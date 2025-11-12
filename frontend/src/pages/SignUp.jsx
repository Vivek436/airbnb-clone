// import React from 'react'
//  import { IoMdEye } from "react-icons/io";
//  import { IoEyeOff } from "react-icons/io5";
// import { useState } from 'react';
// import {useNavigate} from 'react-router-dom'
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import axios from 'axios';
// import { useContext } from 'react';
// import { authDataContext } from '../Context/AuthContext';

// const SignUp = () => {
//   const [show, setshow] = useState(false)
//   let navigate = useNavigate()
//   let serverUrl = useContext(authDataContext)
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSignUp = async (e)=>{
//     try {
//       e.preventDefault()
//       let result = await axios.post(serverUrl + "/api/auth/signup",{
//         name,
//         email,
//         password
//       },{withCredentials:true})
// console.log(result)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
//     <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate('/')}><FaLongArrowAltLeft className='h-[25px] text-[white] w-[25px]'/></div>
//       <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleSignUp}>
//         <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>
//         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
//         <label htmlFor="name" className='text-[20px]'>UserName</label>
//         <input type="text" id='name' required onChange={(e)=>setName(e.target.value)} className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]' value={name}/>
//         </div>
//         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] '>
//         <label htmlFor="email" className='text-[20px]'>Email</label>
//         <input type="text" id='email' required onChange={(e)=>setEmail(e.target.value)}  className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]'value={email} />
//         </div>
//         <div className=' relative w-[90%] flex items-start justify-start flex-col gap-[10px] '>
//         <label htmlFor="password" className='text-[20px]'>Password</label>
//         <input type={show?"text":"password"} required onChange={(e)=>setPassword(e.target.value)}  id='password'  className=' w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]' value={password}/>
//         {!show && <IoMdEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>{
//           setshow(prev=>!prev)
//         }}/>}
//        { show && <IoEyeOff  className='w-[22px] h-[22px] absolute right-[12%] cursor-pointer bottom-[10px]' onClick={()=>{
//           setshow(prev=>!prev)
//         }}/>}
//         </div>
//         <button className='px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg mt-[20px]'>SignUp</button>
//         <p className='text-[18px]'>Alerady have account? <span className='text-[19px] text-[red] cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>
//       </form>
//     </div>
//   )
// }

// export default SignUp
import React, { useState, useContext } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import UserContext, { userDataContext } from '../Context/UserContext';

const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);  // ✅ fixed here
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {userData , setUserData} = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,   // ✅ correct URL
        { name, email, password },
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
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center"
        onClick={() => navigate('/')}
      >
        <FaLongArrowAltLeft className="h-[25px] text-[white] w-[25px]" />
      </div>

      <form
        onSubmit={handleSignUp}
        className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]"
      >
        <h1 className="text-[30px] text-[black]">Welcome to Airbnb</h1>

        <div className="w-[90%] flex flex-col gap-[10px] mt-[30px]">
          <label htmlFor="name" className="text-[20px]">UserName</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
            value={name}
          />
        </div>

        <div className="w-[90%] flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px]">Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
            value={email}
          />
        </div>

        <div className="relative w-[90%] flex flex-col gap-[10px]">
          <label htmlFor="password" className="text-[20px]">Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg p-[20px]"
            value={password}
          />
          {!show ? (
            <IoMdEye
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <IoEyeOff
              className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </div>

        <button className="px-[50px] py-[10px] text-[white] bg-[red] text-[18px] md:px-[100px] rounded-lg mt-[20px]">
          Sign Up
        </button>
        <p className="text-[18px]">
          Already have an account?{" "}
          <span
            className="text-[19px] text-[red] cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
