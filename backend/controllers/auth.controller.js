import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body;
        let user = await User.findOne({email});
        if(user){
            console.log(user);
            return res.status(400).json({message: "User Already Exists"});
        }
        if(!fullName || !email || !password || !mobile) {
            console.log(fullName, email, password, mobile)
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 8){
            console.log(password.length)
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }
        if(mobile.length !== 11){
            console.log(mobile.length)
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
            return res.status(400).json({message: "User Doesnot Exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Password"});
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
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
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
