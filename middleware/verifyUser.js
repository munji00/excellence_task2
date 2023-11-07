
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';
import { user_res_mess } from '../constants.js';


export const verifyUser = async(req, res, next) => {
        try {
            const token = req.get("authorization").split(" ")[1];
            const {email} = jwt.verify(token , secretKey);
            if(email)
            {
              req.user_email=email;
              next();
            }
            else
                res.status(403).send(user_res_mess.notFound);
            
        } catch (error) {
            res.status(400).send({message:"token has expired or token not found", error})
        }
}