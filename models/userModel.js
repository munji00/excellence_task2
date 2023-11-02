import mongoose from "mongoose";
import { hash_password , compare_password} from "../utility/helpers.js";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    address:[{type:mongoose.Schema.Types.ObjectId, ref:'userAddress'}],
     
}, {timestamps:true});

//pre hook
userSchema.pre("save", async function(next){
    try {
    const hashedPassword = await hash_password(this.password);
    this.set('password', hashedPassword);
    next();
    } catch (error) {
        next(error);
    }  
})

export default mongoose.model('User' , userSchema);