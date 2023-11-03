import express from 'express';
import { registerValidator, loginValidator } from '../validators/userValidator.js';
import { createAddress, deleteUser, getUser, getUserWithAddress, getUserWithPageNo, userLogin, userRegister } from '../controllers/userController.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { user_create_add, user_delete, user_get, user_get_add, user_login, user_register, user_with_page } from '../constants.js';

const userRoutes = express.Router();

userRoutes.post(`/${user_register}`, registerValidator , userRegister)
userRoutes.post(`/${user_login}` , loginValidator , userLogin);
userRoutes.get(`/${user_get}`, verifyUser , getUser);
userRoutes.put(`/${user_delete}`, verifyUser , deleteUser);
userRoutes.get(`/${user_with_page}`, getUserWithPageNo);
userRoutes.post(`/${user_create_add}`, verifyUser , createAddress);
userRoutes.get(`/${user_get_add}`, verifyUser, getUserWithAddress);


export default userRoutes;