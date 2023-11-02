import dotenv from 'dotenv';
dotenv.config();



export const db_url = process.env.DB_URL;
export const port = process.env.PORT;
export const secretKey = process.env.SECRET_KEY;
