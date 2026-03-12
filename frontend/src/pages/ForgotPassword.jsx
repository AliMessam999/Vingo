import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [originalOtp, setOriginalOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data.success) {
                setOriginalOtp(data.otp);
                setStep(2);
                console.log(data.otp);
                // console.log(originalOtp);
                toast.success(data.message);
            }
            else{
                return toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to send OTP", error);
        }
    }

    const verifyOtp = () => {
        try {
            console.log("Otp : ", otp);
            console.log("Original Otp : ", originalOtp);
            if(otp == originalOtp ){
                toast.success("OTP Verified");
                setStep(3);
            }
            else{
                toast.error("OTP is Invalid");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to verify OTP", error);
        }
    }

    const updatePassword = async () => {
        try {
            if(newPassword !== confirmPassword){
                return toast.error("Passwords do not match");
            }
            const res = await fetch("http://localhost:8000/api/auth/updatePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setStep(1);
                navigate("/signin");
            }
            if(!data.success){
                return toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to update password", error);
        }
    }

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
                        <button type='submit' onClick={sendOtp} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
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
                            // onChange={(e) => { setOtp(Number(e.target.value)) }}
                            value={otp}
                            required
                        />
                        {/* Sign Up Button */}
                        <button type='submit' onClick={verifyOtp} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
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
                        <button type='submit' onClick={updatePassword} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
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

// 03:04:20