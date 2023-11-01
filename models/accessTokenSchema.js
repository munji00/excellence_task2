import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user_id:{
        type:Object
    }, 
    accessToken:{
        type:String
    }
})

export default mongoose.model('userTokenCollection', tokenSchema);