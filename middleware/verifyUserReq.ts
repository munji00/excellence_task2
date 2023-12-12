import { validationResult } from "express-validator";
import {client} from '../configration/redisConnection'
import { Request, Response, NextFunction } from "express";
import randomToken from 'rand-token';
import { userServices } from "../services/userServices";
import { user_res_mess } from "../constants";
import { compare_password, hash_password } from "../utility/helpers";
import { ReqInter, userInter } from "../interfaces.td";


export const registerReqValidator = async(req:ReqInter, res:Response, next:NextFunction) => {
  const result = validationResult(req);
  
  if(!result.isEmpty())
       return res.status(406).send({message:user_res_mess.notValid, result});


  if(!userServices.matchPassword(req.body.password, req.body.confirmPassword))
       return res.status(401).send(user_res_mess.misMatch);

  const hashed_pass = await hash_password(req.body.password)
  req.body.password = hashed_pass;

  next();
}

export const loginRegValidator = async(req:ReqInter, res:Response, next:NextFunction) => {
  const  result = validationResult(req);

  if(!result.isEmpty())
    return res.status(406).send({message:user_res_mess.notValid, result});

    const existingUser = await userServices.findData(req.body.email);

  if(existingUser === null) // Check for null or undefined
    return res.status(404).send(user_res_mess.notFound);
  
  if(!await compare_password(req.body.password, existingUser.password))
    return res.status(203).send(user_res_mess.notMatch);

    const genrated_token = userServices.generateToken({email:req.body.email, userName:existingUser.userName})
    const refreshToken = randomToken.uid(256);
    //await client.hSet( refreshToken, {email:req.body.email, userName:req.body.userName})
    res.cookie('refreshToken', refreshToken ,{httpOnly:true, secure:true ,maxAge:24*60*60*60})
    req.token=  genrated_token;
    req.user=existingUser; 
      
  next()    

}
