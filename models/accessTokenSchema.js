import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user_id:{
        type:Object
    }, 
    accessToken:{
        type:String
    },
    createdAt: { type: Date, expires: '60m', default: Date.now }
})

export default mongoose.model('userTokenCollection', tokenSchema);