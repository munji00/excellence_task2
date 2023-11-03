
import {validationResult} from 'express-validator'
import { fetchUser, matchPassword, registerUser, generateToken, saveToken, delete_user, dataWithPage } from '../services/userServices.js';
import { userAddress } from '../models/userAddressModel.js'
import { compare_password, hash_password} from '../utility/helpers.js';


//USER REGISTERATION CONTROLLER
export const userRegister = async(req, res) => {

  const result = validationResult(req);
  if(!result.isEmpty())
  {
    return res.status(403).send({message:"please provide right fields", result});
  }

  try {
    //matching password
    if(!matchPassword(req.body.password, req.body.confirmPassword))
    {
        return res.status(401).send("password mismatch");
    }

    //checking existing user
    const existingUser = await fetchUser({email:req.body.email})
    if(existingUser)
    {
        return res.status(406).send("email already exists");
    }

    //checking is user register with same username
    const userNameExists =await fetchUser({userName:req.body.userName});
    if(userNameExists)
    {
        return res.status(403).send("user already exist with this usernamae")
    }

    //registering user
    const newUser = await registerUser(req.body)
    res.status(201).send({success:true, message:"user registered successfully", newUser})

  } catch (error) {
    res.status(501).send({success:false, message:"internal server error", error});
  }

}


//USER LOGIN CONTROLLER
export const  userLogin = async (req, res) => {
 const result = validationResult(req);
  if(!result.isEmpty())
  {
    return res.status(406).send({message:"please provide right fields", result});
  }
  
 try {
   const existingUser = await fetchUser({email:req.body.email});
   //checking existing user
   if(!existingUser)
   {
    return res.status(404).send("user not found");
   }

   //matching password
   const isTrue = await compare_password(req.body.password, existingUser.password);
   if(!isTrue)
   {
    return res.status(203).send({message:"email or password is incorrect"});
   }

    const user_token = generateToken(req.body.email)
    await saveToken({user_id:existingUser._id, accessToken:user_token});
    res.status(200).send({success:true, message:"user login successfully", access_token:user_token});

 } catch (error) {
  res.status(500).send({success:false, message:"internal error in server", error})
 }
}


//CONTROOLER TO GET A SINGLE USER
export const getUser = async(req, res) => {
  try {
    const user_data= await fetchUser({_id:req.id});
    if(!user_data)
    {
      return res.status(401).send("user is not found")
    }
    res.status(200).send({sucess:true, message:"user found sucessfully", user_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}

//CONTROLLER FOR DELETE USER
export const deleteUser = async(req, res) => {
  try {
     await delete_user({_id:req.id});
     res.status(200).send({sucess:true, message:"user deleted successfully"});

  } catch (error) {
    res.status(500).send({success:true, message:"internal servser error", error});
    
  }
}

//CONTROLLER TO GETING USER WITH PAGE NO.
export const getUserWithPageNo = async(req, res) => {
  const {page} = req.params;
  try {
    const sliced_data = await dataWithPage(page);
    res.status(200).send({success:true, sliced_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}


//CONTROLLER FOR CREATING ADDRESS
export const createAddress = async(req, res) => {
  const {address, city, state, pinCode , mobileNumber} = req.body;
  try {
     const user_data= await fetchUser({_id:req.id});
     if(user_data==null)
     {
      return res.status(401).send("user not register , please first register")
     }
     const newAddress = new userAddress({user_id:req.id, address, city, state, pinCode, mobileNumber})
     await newAddress.save();
     res.status(201).send({success:true, message:"user address created successfully", newAddress})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}

//CONTROLLER FOR GATTING USER WITH ALL ADDRESSES
export const getUserWithAddress = async(req, res) => {
  const {id} = req.params;
  try {
    const user_data = await fetchUser({_id:id})
    res.status(200).send({
      success:true, 
      message:"User data fetched succssfully",
      user_data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:"internal server error", error});
  }

}