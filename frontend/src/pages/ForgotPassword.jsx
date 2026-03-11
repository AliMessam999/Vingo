import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";


const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex w-full border justify-center min-h-screen items-center p-4 bg-[#fff9f6]'>
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
                <div className='flex items-center mb-2 gap-4 text-[#ff4d2d]'>
                    <button className='cursor-pointer' onClick={() => navigate(-1)}>
                        <IoArrowBack size={25} />
                    </button>
                    <h1 className={`text-2xl font-bold text-center mx-auto  text-[#ff4d2d]`}>
                        Forgot Password
                    </h1>
                </div>
                {step === 1 && (
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-gray-700 font-medium text-sm mb-1'>Email</label>
                        <input
                            type="email"
                            id='email'
                            className={`w-full px-3 py-1 border rounded-lg focus:outline-orange-500 focus:border-orange-500 border-[#ddd]`}
                            placeholder='Enter your email'
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            required
                        />
                        {/* Sign Up Button */}
                        <button type='submit' onClick={() => setStep(2)} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className='mb-4'>
                        <label htmlFor="otp" className='block text-gray-700 font-medium text-sm mb-1'>OTP</label>
                        <input
                            type="number"
                            id='otp'
                            className={`w-full px-3 py-1 border rounded-lg focus:outline-orange-500 focus:border-orange-500 border-[#ddd]`}
                            placeholder='Enter OTP'
                            onChange={(e) => { setOtp(e.target.value) }}
                            value={otp}
                            required
                        />
                        {/* Sign Up Button */}
                        <button type='submit' onClick={() => setStep(3)} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        // onClick={handleSignin}
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <>
                        <div className='mb-4'>
                            <label htmlFor="new-password" className='block text-gray-700 font-medium text-sm mb-1'>New Password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id='new-password'
                                    className={`w-full px-3 py-1 border border-[#ddd] rounded-lg focus:outline-orange-500 focus:border-orange-500`}
                                    placeholder='Enter new password'
                                    onChange={(e) => { setNewPassword(e.target.value) }}
                                    value={newPassword}
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
                        <div className='mb-4'>
                            <label htmlFor="confirm-password" className='block text-gray-700 font-medium text-sm mb-1'>Confirm Password</label>
                            <div className='relative'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id='confirm-password'
                                    className={`w-full px-3 py-1 border border-[#ddd] rounded-lg focus:outline-orange-500 focus:border-orange-500`}
                                    placeholder='Confirm your password'
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    value={confirmPassword}
                                    required />
                                <button type='button' className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                                    {showConfirmPassword ?
                                        <IoIosEye onClick={() => setShowConfirmPassword(false)} />
                                        :
                                        <IoIosEyeOff onClick={() => setShowConfirmPassword(true)} />
                                    }
                                </button>
                            </div>
                        </div> 
                        {/* Sign Up Button */}
                        <button type='submit' onClick={() => setStep(1)} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword