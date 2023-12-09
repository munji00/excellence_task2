import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

export const port = process.env.PORT;
export const secretKey:Secret= "js*67686*75656%#vvagknkas7t7";
