import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pinCode:{
        type:String
    },
    phoneNumber:{
        type:String,
        min:10,
        max:10
    }

})

export const userAddress = mongoose.model('userAddress', addressSchema);