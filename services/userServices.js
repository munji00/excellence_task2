import Users from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';
import userTokenCollection from '../models/accessTokenSchema.js'
export const userServices = {
    fetchUser : async(field) => await Users.findOne(field).populate('address'),
    matchPassword :(password, confirmPassword)=> password===confirmPassword,

    registerUser : async(body_data) =>{
      const newUser = new Users(body_data);
      await newUser.save();
      return newUser;
    },

    generateToken:(obj) => jwt.sign(obj, secretKey, {expiresIn:'1h'}),

    saveToken :async(tokenData) => {
      const newTokenData = new userTokenCollection(tokenData);
      await newTokenData.save()
    },

    delete_user:async(field) =>  await Users.deleteOne(field),

    dataWithPage :async(page) => {
    const user_data = await Users.find();
    const start_index = (page - 1)*10;
    const end_index = page*10;
    const sliced_data = user_data.slice(start_index, end_index);
    return sliced_data;
}
}