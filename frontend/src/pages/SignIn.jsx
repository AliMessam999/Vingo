import React, { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';


function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {email, password}, {withCredentials: true})
      console.log(result.data)
    } catch (error) {
      console.log(error)
    } 
  }
  return (
    <div className='min-h-screen flex items-center justify-center w-full' style={{backgroundColor: bgColor}}>
      <div className={`bg-white rounded-xl w-full max-w-md px-6 py-4 shadow-lg border`} style={{borderColor: borderColor}}>
        <h1 className={`text-2xl font-bold text-center`} style={{color: primaryColor}}>Vingo</h1>
        <p className={`text-center text-gray-500 mb-1`}>Signin to your account</p>
       
        
        {/* email */}
        <div className='mb-1'>
          <label htmlFor="email" className='block text-gray-700 font-medium text-sm mb-1'>Email</label>
          <input 
            type="email" 
            id='email' 
            className={`w-full px-3 py-1 border rounded-lg focus:outline-orange-500 focus:border-orange-500`} 
            style={{borderColor: borderColor}} 
            placeholder='Enter your email' 
            onChange={(e) => {setEmail(e.target.value)}}
            value={email} 
            required />
        </div>
        
        {/* password */}
        <div className='mb-1'>
          <label htmlFor="password" className='block text-gray-700 font-medium text-sm mb-1'>Password</label>
          <div className='relative'>
            <input 
            type={showPassword ? "text" : "password"} 
            id='password' 
            className={`w-full px-3 py-1 border rounded-lg focus:outline-orange-500 focus:border-orange-500`} 
            style={{borderColor: borderColor}} 
            placeholder='Enter your password' 
            onChange={(e) => {setPassword(e.target.value)}}
            value={password}  
            required />
            <button type='button' className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
            {showPassword ? 
              <IoIosEye onClick={() => setShowPassword(false)} />
             : 
              <IoIosEyeOff onClick={() => setShowPassword(true)} />
            }
            </button>
          </div>
        </div>

        <Link to="/forgot-password" className='block my-2 text-right text-orange-400 hover:underline hover:text-orange-500 cursor-pointer font-bold'>Forgot Password?</Link>

        {/* Sign Up Button */}
        <button type='submit' className='w-full py-2 rounded-lg font-medium transition-colors cursor-pointer transition duration-200' 
          onClick={handleSignin}
          style={{backgroundColor: primaryColor, color: "white"}}>
          Sign In
        </button>
        {/* Or */}
        <div className="flex items-center justify-center gap-2 my-2 text-gray-400">
          <hr className='flex-1' />
          <span className='text-gray-400'>or</span>
          <hr className='flex-1' />
        </div>
        {/* Google Button */}
        <button className='w-full flex items-center justify-center cursor-pointer gap-2 transition duration-200 hover:bg-gray-200 border border-[#ddd] p-2 rounded-sm' style={{}}>
          <FcGoogle size={25}/>
          <span className='text-gray-700 font-medium'>Sign in with Google</span>
        </button>
        <span className='mx-auto w-full text-gray-400 block text-center mt-2'>Don't have an Account? <Link to="/signup" className='text-orange-400 hover:underline hover:text-orange-500 cursor-pointer font-bold'>Sign Up</Link></span>
          
      </div>
      
    </div>
  )
}

export default SignIn