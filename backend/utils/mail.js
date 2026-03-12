import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendOtpMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`,
        });
    } catch (error) {
        console.log(error);
    }
}