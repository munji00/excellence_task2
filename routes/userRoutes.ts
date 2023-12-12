import express from 'express';
import { registerValidator, loginValidator } from '../validators/userValidator';
import * as allControllers from '../controllers/userController'
import { verifyUser } from '../middleware/verifyUser';
import { user_routes_path } from '../constants';
import { registerReqValidator, loginRegValidator } from '../middleware/verifyUserReq';
import {upload} from '../configration/multerConfigration'
const userRoutes = express.Router();

userRoutes.post(user_routes_path.register, registerValidator,registerReqValidator , allControllers.userRegister)
userRoutes.post(user_routes_path.login , loginValidator ,loginRegValidator, allControllers.userLogin);
userRoutes.get(user_routes_path.getOne , verifyUser , allControllers.getUser);
userRoutes.put(user_routes_path.delete , verifyUser , allControllers.deleteUser);
userRoutes.get(user_routes_path.getWithPage , allControllers.getUserWithPageNo);
userRoutes.post(user_routes_path.address , verifyUser , allControllers.createAddress);
userRoutes.get(user_routes_path.getwithAdd , verifyUser , allControllers.getUserWithAddress);
userRoutes.delete(user_routes_path.address, verifyUser, allControllers.deleteAdd)
userRoutes.post(user_routes_path.forgotPassword, allControllers.forgotPassword)
userRoutes.put(user_routes_path.resetPassword, verifyUser, allControllers.resetPassword)
userRoutes.put(user_routes_path.uploadFile, upload.single('profile-img'), allControllers.uploadFile)
userRoutes.post(user_routes_path.regenrateAccessToken, allControllers.newAccessToken)


export default userRoutes;