
import { userAddress } from '../models/userAddressModel.js'
import { user_res_mess } from '../constants.js';
import { userServices } from '../services/userServices.js';




//USER REGISTERATION CONTROLLER
export const userRegister = async(req, res) => {

  try {
    //checking existing user
    const existingUser = await userServices.fetchUser({email:req.body.email})
    if(existingUser)
    {
        return res.status(406).send(user_res_mess.exists);
    }

    //checking is user register with same username
    const userNameExists =await userServices.fetchUser({userName:req.body.userName});
    if(userNameExists)
    {
        return res.status(403).send(user_res_mess.exists)
    }

    //registering user
    const newUser = await userServices.registerUser(req.body)
    res.status(201).send({success:true, message:user_res_mess.signup, newUser})

  } catch (error) {
    console.log(error)
    res.status(501).send({success:false, message:"internal server error", error});
  }

}




//USER LOGIN CONTROLLER
export const  userLogin = async (req, res) => {
 try {
    await userServices.saveToken({user_id:req.user._id, accessToken:req.token});
    res.status(200).send({success:true, message:user_res_mess.login, access_token:req.token});
 } catch (error) {
 console.log(error)
    res.status(500).send({success:false, message:"internal error in server", error})
 }
}




//CONTROOLER TO GET A SINGLE USER
export const getUser = async(req, res) => {
  try {
    const user_data= await userServices.fetchUser({_id:req.id});
    if(!user_data)
    {
      return res.status(401).send(user_res_mess.notFound)
    }
    res.status(200).send({sucess:true, message:user_res_mess.found, user_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}




//CONTROLLER FOR DELETE USER
export const deleteUser = async(req, res) => {
  try {
     await userServices.delete_user({_id:req.id});
     res.status(200).send({sucess:true, message:user_res_mess.deleted});

  } catch (error) {
    res.status(500).send({success:true, message:"internal servser error", error});
    
  }
}




//CONTROLLER TO GETING USER WITH PAGE NO.
export const getUserWithPageNo = async(req, res) => {
  const {page} = req.params;
  try {
    const sliced_data = await userServices.dataWithPage(page);
    res.status(200).send({success:true, sliced_data})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}




//CONTROLLER FOR CREATING ADDRESS
export const createAddress = async(req, res) => {
  const {address, city, state, pinCode , mobileNumber} = req.body;
  try {
     const user_data= await userServices.fetchUser({_id:req.id});
     if(user_data==null)
     {
      return res.status(401).send(user_res_mess.notFound)
     }
     const newAddress = new userAddress({user_id:req.id, address, city, state, pinCode, mobileNumber})
     await newAddress.save();
     res.status(201).send({success:true, message:user_res_mess.add_created, newAddress})
  } catch (error) {
    res.status(500).send({success:false, message:"internal server error", error})
  }
}



//CONTROLLER FOR GATTING USER WITH ALL ADDRESSES
export const getUserWithAddress = async(req, res) => {
  const {id} = req.params;
  try {
    const user_data = await userServices.fetchUser({_id:id})
    res.status(200).send({
      success:true, 
      user_data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:"internal server error", error});
  }

}