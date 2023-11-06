import userTokenCollection from '../models/accessTokenSchema.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';
import { user_res_mess } from '../constants.js';


export const verifyUser = async(req, res, next) => {
        try {
            const token = req.get("authorization").split(" ")[1];
            const decoded_data = jwt.verify(token , secretKey);
            const isExist = await userTokenCollection.findOne({accessToken:token})
            if(isExist)
            {
              req.id=isExist.user_id;
              next();
            }
            else
                res.status(403).send(user_res_mess.notFound);
            
        } catch (error) {
            res.status(400).send({message:"token has expired or token not found", error})
        }
}