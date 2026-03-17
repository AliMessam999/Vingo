import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { toast } from "react-toastify";
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [originalOtp, setOriginalOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${serverUrl}/api/auth/send-otp`, {email}, {withCredentials: true});

            if (res.data.success) {
                setOriginalOtp(res.data.otp);
                setStep(2);
                toast.success(res.data.message);
                setError("");
            }
            else{
                // return toast.error(res.data.message);
                setError(res.data.message);
            }
        } catch (error) {
            // toast.error("Failed to send OTP", error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const verifyOtp = () => {
        try {
            setLoading(true);
            if(otp == originalOtp ){
                toast.success("OTP Verified");
                setStep(3);
                setError("");
            }
            else{
                // toast.error("OTP is Invalid");
                setError("OTP is Invalid");
            }
        } catch (error) {
            // toast.error("Failed to verify OTP", error);
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const updatePassword = async () => {
        try {
            setLoading(true);
            if(newPassword !== confirmPassword){
                // return toast.error("Passwords do not match");
                setError("Passwords do not match");
            }
            const res = await axios.post(`${serverUrl}/api/auth/updatePassword`, {email, newPassword}, {withCredentials: true});
            if (res.data.success) {
                toast.success(res.data.message);
                setStep(1);
                navigate("/signin");
                setError("");
            }
            else{
                // return toast.error(res.data.message);
                setError(res.data.message);
            }
        } catch (error) {
            // toast.error("Failed to update password", error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
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
                    {/* <br /> */}
                </div>
                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
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
                        <button type='submit' onClick={sendOtp} disabled={loading} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        >
                            {loading ? <ClipLoader color='white' size={15} className='' /> : "Send OTP"}
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className='mb-4'>
                        <label htmlFor="otp" className='block text-gray-700 font-medium text-sm mb-1'>OTP</label>
                        <input
                            autoFocus
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
                        <button type='submit' onClick={verifyOtp} disabled={loading} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        // onClick={handleSignin}
                        >
                            {loading ? <ClipLoader color='white' size={15} className='' /> : "Verify OTP"}
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
                        <button type='submit' onClick={updatePassword} disabled={loading} className='w-full py-2 bg-[#ff4d2d] text-white mt-4 rounded-lg font-medium transition-colors cursor-pointer transition duration-200'
                        >
                            {loading ? <ClipLoader color='white' size={15} className='' /> : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword

// 03:04:20