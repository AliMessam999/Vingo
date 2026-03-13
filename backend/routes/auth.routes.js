import express from "express";
import { signUp, signIn, signOut, sendOtp, update, googleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.post("/send-otp", sendOtp);
router.post("/updatePassword", update);
router.post("/google-auth", googleAuth);
export default router;
