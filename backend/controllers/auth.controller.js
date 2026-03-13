import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body;
        let user = await User.findOne({email});
        if(user){
            console.log('User Already Exists');
            return res.status(400).json({message: "User Already Exists"});
        }
        if(!fullName || !email || !password || !mobile) {
            console.log("All fields are required", fullName, email, password, mobile)
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 8){
            console.log("Password must be at least 8 characters", password.length)
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }
        if(mobile.length !== 11){
            console.log("Mobile number must be 11 digits", mobile.length)
            return res.status(400).json({message: "Mobile number must be 11 digits"})
        }
        const hashedpassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            fullName, email, mobile, role, password: hashedpassword
        });

        const token = await genToken(newUser._id);
        res.cookie("token", token,{
            secure: false,
            samesite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(201).json({
            message: "User Registered Successfully",
            user: newUser,
        })
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User Doesnot Exist", success: false});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Password", success: false});
        }

        const token = await genToken(user._id);
        res.cookie("token", token,{
            secure: false, 
            samesite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json({
            message: "User Signed In Successfully",
            user: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User Signed Out Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User Doesnot Exist"});
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        user.resetOtp = otp;
        user.resetOtpExpiry = Date.now() + 1 * 60 * 1000;
        user.isOtpVerified = false;

        await user.save();

        await sendOtpMail(email, otp);

        return res.status(200).json({message: "OTP Sent Successfully", otp: otp, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

export const update = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User Doesnot Exist", success: false });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters", success: false });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: "Password Updated Successfully",
            success: true
        });

    } catch (error) {
        console.error("Update Password Error:", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const {email, fullName, mobile, role} = req.body;
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({
                email, fullName, mobile, role
            })
        }

        const token = await genToken(user._id);
        res.cookie("token", token,{
            secure: false,
            samesite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.status(200).json(user);
        // if(user){
        //     return res.status(400).json({message: "User Already Exists", success: false});
        // }
        
    } catch (error) {
        return res.status(500).json({message: "Google Auth Error", success: false});
    }
}