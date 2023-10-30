import mongoose from "mongoose";
const db_url ="mongodb://localhost:27017/excellence_task2";

 export const db_connection = async()=>{
    try {
        await mongoose.connect(db_url);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error in database connection" ,error);
    }
}