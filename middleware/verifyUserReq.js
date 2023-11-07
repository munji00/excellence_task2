import { validationResult } from "express-validator";
import { userServices } from "../services/userServices.js";
import { user_res_mess } from "../constants.js";
import { compare_password } from "../utility/helpers.js";


export const registerReqValidator = (req, res, next) => {
  const result = validationResult(req);
  
  if(!result.isEmpty())
       return res.status(406).send({message:user_res_mess.notValid, result});


  if(!userServices.matchPassword(req.body.password, req.body.confirmPassword))
       return res.status(401).send(user_res_mess.misMatch);

  next();
}

export const loginRegValidator = async(req, res, next) => {
  const  result = validationResult(req);

  if(!result.isEmpty())
      return res.status(406).send({message:user_res_mess.notValid, result});

  const existingUser = await userServices.fetchUser({email:req.body.email});
  if(!existingUser)
      return res.status(404).send(user_res_mess.notFound);
   
  
  if(!await compare_password(req.body.password, existingUser.password))
      return res.status(203).send(user_res_mess.notMatch);

   const genrated_token = userServices.generateToken({email:req.body.email, userName:existingUser.userName})
   req.token=  genrated_token;
   req.user=existingUser; 
      
  next()    

}