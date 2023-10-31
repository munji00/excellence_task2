import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { db_url } from './config/config.js';
const salt_value = 10;

export const hash_password = async(plain_password)=>
{
   return await bcrypt.hash(plain_password, salt_value);
}

export const compare_password = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const db_connection = async()=>{
    try {
        await mongoose.connect(db_url);
        console.log("database connected successfully");
    } catch (error) {
        console.log("error in database connection" ,error);
    }
}
//createdAt: { type: Date, expires: '2m', default: Date.now }