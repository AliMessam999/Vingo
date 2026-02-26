import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;

import connectDb from "./config/db.js";

app.listen(port, ()=>{
    connectDb();
    console.log(`Server is running on port ${port}`);
})
