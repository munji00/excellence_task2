var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validationResult } from "express-validator";
import randomToken from 'rand-token';
import { userServices } from "../services/userServices.js";
import { user_res_mess } from "../constants.js";
import { compare_password, hash_password } from "../utility/helpers.js";
export const registerReqValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(406).send({ message: user_res_mess.notValid, result });
    if (!userServices.matchPassword(req.body.password, req.body.confirmPassword))
        return res.status(401).send(user_res_mess.misMatch);
    const hashed_pass = yield hash_password(req.body.password);
    req.body.password = hashed_pass;
    next();
});
export const loginRegValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = validationResult(req);
    if (!result.isEmpty())
        return res.status(406).send({ message: user_res_mess.notValid, result });
    const existingUser = yield userServices.findData(req.body.email);
    if (existingUser === null) // Check for null or undefined
        return res.status(404).send(user_res_mess.notFound);
    if (!(yield compare_password(req.body.password, existingUser.password)))
        return res.status(203).send(user_res_mess.notMatch);
    const genrated_token = userServices.generateToken({ email: req.body.email, userName: existingUser.userName });
    const refreshToken = randomToken.uid(256);
    //await client.hSet( refreshToken, {email:req.body.email, userName:req.body.userName})
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 60 });
    req.token = genrated_token;
    req.user = existingUser;
    next();
});
