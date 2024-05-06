import mongoose from 'mongoose';

const UserSchema= mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     passWord:{
         type:String,
         required:true,
         trim:true
     },
     profilepicture:{
         type:String,
     }
})

const User= mongoose.model('User',UserSchema);

export default User;