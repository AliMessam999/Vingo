import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;

import cors from "cors";
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

import connectDb from "./config/db.js";

import cookieParser from "cookie-parser";
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

app.use(express.json());


app.listen(port, ()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})
