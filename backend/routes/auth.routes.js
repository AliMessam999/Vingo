import express from "express";
import { signUp, signIn, signOut, sendOtp, update, googleAuth } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/updatePassword", update);
authRouter.post("/google-auth", googleAuth);
export default authRouter;
