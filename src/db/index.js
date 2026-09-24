import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const uri = `${process.env.MONGODB_URL}/${DB_NAME}`;

        console.log("MongoDB URI:", uri.replace(/:([^:@]+)@/, ":XXXXX@"));

        const connectionInstance = await mongoose.connect(uri);

        console.log(
            `\n MongoDB is connected DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};

export default connectDB;