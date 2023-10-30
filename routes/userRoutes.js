import express from 'express';
import { getUser, userLogin, userRegister } from '../controllers/userController.js';
import { verifyUser } from '../middleware/verifyUser.js';

const userRoutes = express.Router();

userRoutes.post('/register' , userRegister)
userRoutes.post('/login' , userLogin);
userRoutes.get('/get',verifyUser ,getUser)


export default userRoutes;