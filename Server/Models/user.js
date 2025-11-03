import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        
    }
});

const User = mongoose.model('User', userModel);

export default User;
