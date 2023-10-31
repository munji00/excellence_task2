import md5 from 'md5'
import {validationResult} from 'express-validator'
import Users from '../models/userModel.js'
import userTokenCollection from '../models/accessTokenSchema.js'
import { compare_password, hash_password} from '../helperFunction.js';


//USER REGISTERATION CONTROLLER
export const userRegister = async(req, res) => {
  const {firstName ,lastName, userName, email, password, confirmPassword} = req.body;
  const result = validationResult(req);
  if(!result.isEmpty())
  {
    return res.status(403).send({message:"please provide right fields", result});
  }
  try {
    //matching password
    if(password!==confirmPassword)
    {
        return res.status(203).send({success:true, message:"password mismatch"});
    }

    //checking existing user
    const existingUser = await Users.findOne({email})
    if(existingUser)
    {
        return res.status(403).send({success:true, message:"email already exists"});
    }

    //checking is user register with same username
    const userNameExists =await Users.findOne({userName});
    if(userNameExists)
    {
        return res.status(403).send({success:true, message:"user already exist with this usernamae"})
    }

    //registering user
    const hashedPassword = await hash_password(password);
    const newUser = new Users({firstName, lastName, userName, email, password:hashedPassword})
    await newUser.save();
    res.status(201).send({success:true, message:"user registered successfully", newUser})

  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:"internal server error", error});
  }

}


//USER LOGIN CONTROLLER
export const  userLogin = async (req, res) => {
 const {email , password} = req.body;
 const result = validationResult(req);
  if(!result.isEmpty())
  {
    return res.status(403).send({message:"please provide right fields", result});
  }
 try {
   const existingUser = await Users.findOne({email});

   //checking existing user
   if(!existingUser)
   {
    return res.status(204).send({success:true, message:"user not found"});
   }

   //matching password
   const isTrue = await compare_password(password, existingUser.password);
   if(!isTrue)
   {
    return res.status(203).send({success:true, message:"email or password is incorrect"});
   }
    const user_token = md5(existingUser.password)
    const newTokenCollection = new userTokenCollection({user_id:existingUser._id, accessToken:user_token});
    console.log(user_token, newTokenCollection);
    await newTokenCollection.save();
    res.status(200).send({success:true, message:"user login successfully", access_token:user_token});

 } catch (error) {
  console.log(error);
  res.status(500).send({success:false, message:"internal error in server", error})
 }
}


//CONTROOLER TO GET A SINGLE USER
export const getUser = async(req, res) => {
  const {access_token} = req.headers;
  try {
    const user_data = await Users.findOne({_id:access_token});
    if(!user_data)
    {
      return res.status(204).send({message:"user is not found"})
    }
    res.status(200).send({sucess:true, message:"user found sucessfully", user_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}

//CONTROLLER FOR DELETE USER
export const deleteUser = async(req, res) => {
  const {access_token} = req.headers;
  try {
     await Users.deleteOne({_id:access_token});
     res.status(200).send({sucess:true, message:"user deleted successfully"});

  } catch (error) {
    res.status(500).send({success:true, message:"internal servser error", error});
    
  }
}

//CONTROLLER TO GETING USER WITH PAGE NO.
export const getUserWithPageNo = async(req, res) => {
  const {page} = req.params;
  try {
    const user_data = await Users.find();
    const start_index = (page - 1)*10;
    const end_index = page*10;
    const sliced_data = user_data.slice(start_index, end_index);
    res.status(200).send({success:true, sliced_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}