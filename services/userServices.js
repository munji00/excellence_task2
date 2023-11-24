import {User} from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config.js';


export const userServices = {
    fetchUser : async(field) => await User.findOne({where:field}),
    matchPassword :(password, confirmPassword)=> password===confirmPassword,

    registerUser : async(body_data) =>{
      const newUser = await User.create(body_data);
      console.log(newUser);
      return newUser
    },

    generateToken:(obj, time='1h') => jwt.sign(obj, secretKey, {expiresIn:time}),

    delete_user:async(field) =>  await User.destroy({where:field}),

    dataWithPage :async(page) => {
    const user_data = await User.findAll();
    const start_index = (page - 1)*10;
    const end_index = page*10;
    const sliced_data = user_data.slice(start_index, end_index);
    return sliced_data;
}
}