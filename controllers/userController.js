
import { userAddress } from '../models/userAddressModel.js'
import { user_res_mess } from '../constants.js';
import { userServices } from '../services/userServices.js';
import { resHandler } from '../handlers/resHandler.js';
import { hash_password} from '../utility/helpers.js';
import Users from '../models/userModel.js'
import { send_mail } from '../config/emailConfigration.js';
import { refreshTokens } from '../middleware/verifyUserReq.js'




//USER REGISTERATION CONTROLLER
export const userRegister = async(req, res, next) => {

  try {
    //checking existing user
    const existingUser = await userServices.fetchUser({email:req.body.email})
    if(existingUser)
    {
        //return res.status(406).send(user_res_mess.exists);
        return resHandler(res,406, user_res_mess.exists);
    }

    //checking is user register with same username
    const userNameExists =await userServices.fetchUser({userName:req.body.userName})
    if(userNameExists)
    {
        //return res.status(403).send(user_res_mess.exists)
        return resHandler(res, 403, user_res_mess.exists)
    }

    //registering user
    const newUser = await userServices.registerUser(req.body)
    await send_mail({
       to:req.body.email,
       link:"",
       message:'register successfully',
       subject:"regarding signup"})
       
    //res.status(201).send({success:true, message:user_res_mess.signup, newUser})
       resHandler(res, 201, {success:true, message:user_res_mess.signup, newUser})

  } catch (error) {
       console.log(error)
       //errorHandler(res, 500, error.message);
       next(error)
  }

}




//USER LOGIN CONTROLLER
export const  userLogin = async (req, res, next) => {
 try {
    console.log(refreshTokens)
    resHandler(res, 200, {
      success:true,
      message:user_res_mess.login,
      access_token:req.token,
      refresh_token:req.refresh_token
    })
 } catch (error) {
     next(error)
     //errorHandler(res, 501 , error.message);
 }
}




//CONTROOLER TO GET A SINGLE USER
export const getUser = async(req, res, next) => {
  try {
    const user_data= await userServices.fetchUser({email:req.user_email});
    if(!user_data)
    {
      return resHandler(res, 401, user_res_mess.notFound)
    }
    resHandler(res, 200, {sucess:true, message:user_res_mess.found, user_data})
  } catch (error) {
    //res.status(500).send({success:false, message:"internal server error", error})
    next(error)
  }
}





//CONTROLLER FOR DELETE USER
export const deleteUser = async(req, res, next) => {
  try {
     await userServices.delete_user({_id:req.user_email});
     resHandler(res, 200, user_res_mess.deleted);
  } catch (error) {
    //res.status(500).send({success:true, message:"internal servser error", error});
     next(error) 
  }
}




//CONTROLLER TO GETING USER WITH PAGE NO.
export const getUserWithPageNo = async(req, res, next) => {
  const {page} = req.params;
  try {
    const sliced_data = await userServices.dataWithPage(page);
    resHandler(res, 200, {success:true, sliced_data})
    //res.status(200).send({success:true, sliced_data})
  } catch (error) {
    next()
    //res.status(500).send({success:false, message:"internal server error", error})
  }
}




//CONTROLLER FOR CREATING ADDRESS
export const createAddress = async(req, res, next) => {
  const {address, city, state, pinCode , mobileNumber} = req.body;
  try {
     const user_data= await userServices.fetchUser({email:req.user_email});
     if(user_data==null)
     {
      return resHandler(res, 401, user_res_mess.notFound)
     }
     const newAddress = new userAddress({user_id:user_data._id, address, city, state, pinCode, mobileNumber})
     await newAddress.save();
     resHandler(res, 201, {success:true, message:user_res_mess.add_created, newAddress})
  } catch (error) {
    //res.status(500).send({success:false, message:"internal server error", error})
    next(error)
  }
}



//CONTROLLER FOR GATTING USER WITH ALL ADDRESSES
export const getUserWithAddress = async(req, res, next) => {
  const {id} = req.params;
  try {
    const user_data = await userServices.fetchUser({_id:id})
    resHandler(res, 200,{success:true, user_data})
  } catch (error) {
    //res.status(500).send({success:false, message:"internal server error", error});
    next(error)
  }
}



//DELETE ADDRESS
 export const deleteAdd = async(req, res, next) => {
  try {
    await userAddress.deleteMany({_id : { $in : req.body.addressIds}});
    //res.status(200).send('addresses deleted successfully')
    resHandler(res, 200, "address deleted successfully")
  } catch (error) {
    //res.status(501).send('addresses deleted successfully')
    next(error)
    //errorHandler(res, 501, error.message)
  }
}


//NEW TOKEN FOR PASSWORD RESET
export const forgotPassword = async(req, res, next) => {

  try {
    const existingUser = await userServices.fetchUser({email:req.body.email})
    if(!existingUser) return resHandler(res, 404 , user_res_mess.notFound)
    const newToken = userServices.generateToken({email:req.body.email}, '15m')
    await send_mail({
      to:req.body.email,
      subject:'reset password', 
      message:"Click below link to reset password", 
      link:newToken,
    })
    resHandler(res, 201, {token:newToken})
  } catch (error) {
    next(error)
  }
}


//PASSWORD RESET
export const resetPassword = async(req, res, next) => {
  try {
    if(!userServices.matchPassword(req.body.password, req.body.confirmPassword))
      return resHandler(res, 401, user_res_mess.misMatch);
      
      const hashed_pass = await hash_password(req.body.password)
      await Users.findOneAndUpdate({email:req.user_email}, {password:hashed_pass});
      await send_mail({
        to:req.user_email,
        subject:"",
        link:"",
        message:"Passwords reset successfull"})
      resHandler(res, 205 , user_res_mess.resetPassword)
  } catch (error) {
    next(error)
  }
}

//CONTROLLER FOR UPLOAD FILE
export const uploadFile = (req, res) => {
  if(!req.file) return resHandler(res, 403, "no file selected")
  resHandler(res, 201, user_res_mess.passwordReset);
}


//GENERATE NEW TOKEN USING REFRESH TOKEN
export const newAccessToken = async(req, res) => {
   const refresh_token = req.headers.refresh_token;
   if((refresh_token in refreshTokens) && (refreshTokens[refresh_token].userName===req.body.userName))
   {
    //genrating new token
    const new_access_token = userServices.generateToken({email:req.body.email, userName:req.body.userName}, '15m')
    resHandler(res, 201, {access_token:new_access_token});
   }
   resHandler(res, 403, "resfresh token not found or refresh token not valid")
}