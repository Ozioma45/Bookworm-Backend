import User from '../model/user.js';
import { hashPassword } from '../config/bcryptjs.js';

export const saveUser = async(name,email,passWord)=>{
    try{
    const hashedPassword= await hashPassword(passWord)
    const newUser = new User({
        name,
        email,
        passWord:hashedPassword
    });
    newUser.save()
    return newUser
    }catch(error){
        console.log(error);
    }
}

export const findUserByEmail = async(email)=>{
    try{
        const user = await User.findOne({email})
        return user
    }catch(error){
        console.log(error);
    }
}

export const findUserAndUpdate=async(id,imageUrl)=>{
    try{
        const user= await User.findByIdAndUpdate(id,{ profilepicture:imageUrl},{new:true})
        return user
    }catch(error){
        console.log(error);
    }
}

export const  updateUserPassword=async(email,passWord)=>{
    try{
        const user= await User.findOneAndUpdate({email},{passWord:passWord},{new:true})
        return user
    }catch(error){
        console.log(error);
    }
}