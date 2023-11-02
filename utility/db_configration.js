import { db_url } from "../config/config.js";
import mongoose from "mongoose";
const db_connection = async()=>{
    try {
        await mongoose.connect(db_url);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error in database connection" ,error);
    }
}
export default db_connection;