import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

connectDB()
.then(() =>{
    app.listen(process.env.PORT ||8000, () => {
        console.log(`Server is running at PORT: ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO db connection failed", err);
})



















/*
( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/$ 
            {DB_NAME}`)
            app.on("error", (error) => {
                console.log("ERR:", error);
                throw error
            })
            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port $ 
                    {process.env.PORT}`)
            })
    } catch (error) {
        console.error("ERROR:", error)
        throw err
    }
}) 
*/