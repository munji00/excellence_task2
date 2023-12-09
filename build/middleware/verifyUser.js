var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { secretKey } from '../configration/config.js';
import { user_res_mess } from '../constants.js';
import { resHandler } from '../handlers/resHandler.js';
export const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.get("authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            throw new Error();
        const decoded_data = (yield jwt.verify(token, secretKey));
        const curr_date = new Date();
        if (!decoded_data) {
            resHandler(res, 404, { success: false, message: user_res_mess.notFound });
        }
        else if (decoded_data.exp && (decoded_data === null || decoded_data === void 0 ? void 0 : decoded_data.exp) * 1000 < curr_date.getTime()) {
            return resHandler(res, 401, { success: false, message: "access token expired" });
        }
        else {
            req.email = decoded_data === null || decoded_data === void 0 ? void 0 : decoded_data.email,
                req.userName = decoded_data === null || decoded_data === void 0 ? void 0 : decoded_data.userName;
            next();
        }
    }
    catch (error) {
        resHandler(res, 501, { success: false, message: "please authenticat" });
    }
});
