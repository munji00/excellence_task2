
import { user_res_mess } from '../constants.js';
import { userServices } from '../services/userServices.js';
import { resHandler } from '../handlers/resHandler.js';
import { hash_password} from '../utility/helpers.js';
import { send_mail } from '../configration/emailConfigration.js';
import { Request, Response, NextFunction } from 'express';
import { ReqInter} from '../interfaces.td.js';
import { client } from '../configration/redisConnection.js';




//USER REGISTERATION CONTROLLER
export const userRegister = async(req:Request, res:Response, next:NextFunction) => {
  const {firstName, lastName, userName, email, password} = req.body;

  try {
    //checking existing user
    const existingUser= await userServices.findData(req.body.email);
    if(existingUser)
    {
         return resHandler(res,406, {success:false,message:user_res_mess.exists});
    }

    //registering user
       userServices.insertData({firstName, lastName, userName, email, password})
       await send_mail({
       to:req.body.email,
       link:"",
       message:'register successfully',
       subject:"regarding signup"}) 
       
       resHandler(res, 201, {success:true, message:user_res_mess.signup, userData:req.body})

  } catch (error) {
       console.log(error)
       next(error)
  }

}




//USER LOGIN CONTROLLER
export const  userLogin = async (req:ReqInter, res:Response, next:NextFunction) => {
 try {
    resHandler(res, 200, {
      success:true,
      message:user_res_mess.login,
      accessToken:req.token,
    })
 } catch (error) {
     next(error)
 }
}




//CONTROOLER TO GET A SINGLE USER
export const getUser = async(req:ReqInter, res:Response, next:NextFunction) => {
  try {
    const user_data= await userServices.findData(req.email);
    if(user_data===null)
    {
      return resHandler(res, 401,{success:false,message: user_res_mess.notFound})
    }
    resHandler(res, 200, {success:true, message:user_res_mess.found, userData:user_data})
  } catch (error) {
    next(error)
  }
}





//CONTROLLER FOR DELETE USER
export const deleteUser = async(req:ReqInter, res:Response, next:NextFunction) => {
  try {
     await userServices.delete_user(req.email);
     resHandler(res, 200, {success:true ,message:user_res_mess.deleted});
  } catch (error) {
     next(error) 
  }
}




//CONTROLLER TO GETING USER WITH PAGE NO.
export const getUserWithPageNo = async(req:Request, res:Response, next:NextFunction) => {
  const {page} = req.params;
  try {
    const sliced_data = await userServices.dataWithPage(+page);
    resHandler(res, 200, {success:true, message:"", pageData:sliced_data})
  } catch (error) {
    next()
  }
}




//CONTROLLER FOR CREATING ADDRESS
export const createAddress = async(req:ReqInter, res:Response, next:NextFunction) => {
  console.log("line 1" ,req.body);
  const {address, city, state, pinCode , mobileNumber} = req.body;
  try {
     const user_data= await userServices.findData(req.email);
     console.log(user_data)
     if(user_data==null)
     {
      return resHandler(res, 401, {success:false ,message:user_res_mess.notFound})
     }
     userServices.createAdd({user_id:user_data.user_id , address, city, state, pinCode, mobileNumber})
     resHandler(res, 201, {success:true, message:user_res_mess.add_created, userAdd:req.body})
  } catch (error) {
    console.log(error);
    next(error)
  }
}



//CONTROLLER FOR GATTING USER WITH ALL ADDRESSES
export const getUserWithAddress = async(req:Request, res:Response, next:NextFunction) => {
  const {id} = req.params;
  try {
    const user_data = await userServices.findData(req.body.email)
    resHandler(res, 200,{success:true,message:"" ,userData:user_data})
  } catch (error) {
    next(error)
  }
}



//DELETE ADDRESS
 export const deleteAdd = async(req:Request, res:Response, next:NextFunction) => {
  try {
    await userServices.deleteAddresses(req.body.addressIds);
    resHandler(res, 200,{success:true ,message: "address deleted successfully"})
  } catch (error) {
    next(error)
  }
}


//NEW TOKEN FOR PASSWORD RESET
export const forgotPassword = async(req:Request, res:Response, next:NextFunction) => {

  try {
    const existingUser = await userServices.findData(req.body.email)
    if(existingUser===null) return resHandler(res, 404 ,{success:false,message: user_res_mess.notFound})
    const newToken = userServices.generateToken({email:req.body.email}, '15m')
    await send_mail({
      to:req.body.email,
      subject:'reset password', 
      message:"Click below link to reset password", 
      link:newToken,
    })
    resHandler(res, 201, {success:true, message:"new token genrated" ,accessToken:newToken})
  } catch (error) {
    next(error)
  }
}


//PASSWORD RESET
export const resetPassword = async(req:ReqInter, res:Response, next:NextFunction) => {
  try {
    if(!userServices.matchPassword(req.body.password, req.body.confirmPassword))
      return resHandler(res, 401, {success:false ,message:user_res_mess.misMatch});
      
      const hashed_pass = await hash_password(req.body.password)
      await userServices.updateUser(req.email, hashed_pass);
      await send_mail({
        to:req.body.email,
        subject:"",
        link:"",
        message:"Passwords reset successfull"})
      resHandler(res, 205 ,{success:true, message:user_res_mess.resetLink})
  } catch (error) {
    next(error)
  }
}

//CONTROLLER FOR UPLOAD FILE
export const uploadFile = (req:Request, res:Response) => {
  if(!req.file) return resHandler(res, 403, {success:false, message:"no file selected"})
  resHandler(res, 201, {success:true, message:user_res_mess.passwordReset});
}


//GENERATE NEW TOKEN USING REFRESH TOKEN
export const newAccessToken = async(req:Request, res:Response) => {
   const refresh_token = req.headers?.refresh_token;
   const email = client.hGetAll(refresh_token as string)
   if((refresh_token ) && (email===req.body.email))
   {
    //genrating new token
    const new_access_token = userServices.generateToken({email:req.body.email, userName:req.body.userName}, '15m')
    resHandler(res, 201, {success:true , message:"" ,accessToken:new_access_token});
   }
   resHandler(res, 403, {success:false, message:user_res_mess.refTok_notFound})
}