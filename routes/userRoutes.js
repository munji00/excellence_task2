import express from 'express';
import { registerValidator, loginValidator } from '../validators/userValidator.js';
import { createAddress, deleteUser, getUser, getUserWithAddress, getUserWithPageNo, userLogin, userRegister } from '../controllers/userController.js';
import { verifyUser } from '../middleware/verifyUser.js';

const userRoutes = express.Router();

userRoutes.post('/register',registerValidator, userRegister)
userRoutes.post('/login' ,loginValidator, userLogin);
userRoutes.get('/get',verifyUser ,getUser);
userRoutes.put('/delete', verifyUser, deleteUser);
userRoutes.get('/list/:page', getUserWithPageNo);
userRoutes.post('/address', verifyUser, createAddress);
userRoutes.get('/get/:id', verifyUser, getUserWithAddress);


export default userRoutes;