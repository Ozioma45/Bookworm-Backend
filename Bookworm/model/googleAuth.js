import mongoose from "mongoose";

const googleUserSchema=({
    googleId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profilepicture:{
        type:String,
    }
})

const GoogleUser= mongoose.model('GoogleUser',googleUserSchema);

export default GoogleUser;