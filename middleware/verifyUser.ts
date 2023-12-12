
import jwt from 'jsonwebtoken';
import { secretKey } from '../configration/config';
import { user_res_mess } from '../constants';
import {resHandler} from '../handlers/resHandler';
import {NextFunction, Response} from 'express'
import { ReqInter, jsonDataInter, userInter} from '../interfaces.td';


export const verifyUser = async(req:ReqInter, res:Response, next:NextFunction) => {
        try {
            const token:string | undefined = req.get("authorization")?.split(" ")[1];
            if(!token) throw new Error()
            
            const decoded_data:jsonDataInter = (await jwt.verify(token, secretKey)) as jsonDataInter ;

            const curr_date = new Date();
            if(!decoded_data){
              resHandler(res, 404,{success:false, message:user_res_mess.notFound})
            }
            else if( decoded_data.exp && decoded_data?.exp*1000 < curr_date.getTime())
            {
              return resHandler(res, 401, {success:false, message:"access token expired"})
            }
            else{
              req.email=decoded_data?.email,
              req.userName= decoded_data?.userName
              next()
            }
        } catch (error) {
            resHandler(res, 501,{success:false, message:"please authenticat"})
        }
}