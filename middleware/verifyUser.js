
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';
import { user_res_mess } from '../constants.js';
import { resHandler } from '../handlers/resHandler.js';


export const verifyUser = async(req, res, next) => {
        try {
            const token = req.get("authorization").split(" ")[1];
            const decoded_data = await jwt.verify(token , secretKey);
            const curr_date = new Date();
            if(!decoded_data){
              resHandler(res, 404, user_res_mess.notFound)
            }
            else if(decoded_data.exp*1000 > curr_date)
            {
              return resHandler(res, 401, "access token expired")
            }
            else{
              req.email=decoded_data.email,
              req.userName= decoded_data.userName
              next()
            }
        } catch (error) {
            resHandler(res, 501, error.meesage)
        }
}