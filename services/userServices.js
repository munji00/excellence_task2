import Users from '../models/userModel.js';
import userTokenCollection from '../models/accessTokenSchema.js'
import md5 from 'md5';

export const fetchUser = async(field) =>{
    
    return await Users.findOne(field);
}

export const matchPassword = (password, confirmPassword) =>{
    return password===confirmPassword;
}
export const registerUser = async(body_data) =>{

    const newUser = new Users(body_data);
    await newUser.save();
    return newUser;
}

export const generateToken = (password) => {
    return md5(password);
}

export const saveToken = async(tokenData) => {
   const newTokenData = new userTokenCollection(tokenData);
   await newTokenData.save()
}

export const delete_user = async(field) =>{
    await Users.delete(field)
}

export const dataWithPage = async(page) => {
    const user_data = await Users.find();
    const start_index = (page - 1)*10;
    const end_index = page*10;
    const sliced_data = user_data.slice(start_index, end_index);
    return sliced_data;
}