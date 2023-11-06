import express from 'express';
import { registerValidator, loginValidator } from '../validators/userValidator.js';
import * as allControllers from '../controllers/userController.js'
import { verifyUser } from '../middleware/verifyUser.js';
import { user_routes_path } from '../constants.js';
import { registerReqValidator, loginRegValidator } from '../middleware/verifyUserReq.js';

const userRoutes = express.Router();

userRoutes.post(user_routes_path.register, registerValidator,registerReqValidator , allControllers.userRegister)
userRoutes.post(user_routes_path.login , loginValidator ,loginRegValidator, allControllers.userLogin);
userRoutes.get(user_routes_path.getOne , verifyUser , allControllers.getUser);
userRoutes.put(user_routes_path.delete , verifyUser , allControllers.deleteUser);
userRoutes.get(user_routes_path.getWithPage , allControllers.getUserWithPageNo);
userRoutes.post(user_routes_path.createAdd , verifyUser , allControllers.createAddress);
userRoutes.get(user_routes_path.getwithAdd , verifyUser , allControllers.getUserWithAddress);


export default userRoutes;