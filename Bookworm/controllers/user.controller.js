import {saveUser,findUserByEmail} from '../service/user.service.js';
import {validateUserSchema, validateUserLoginSchema} from '../config/joi.js';
import {comparePassword} from '../config/bcryptjs.js';
import jwt from 'jsonwebtoken'

export const createUser= async(req,res)=>{
  try{
    const {name,email,passWord}=req.body;
    const vaild= validateUserSchema(name,email,passWord)
    if(!vaild){
       return res.status(400).json({error:'invalid data'})
    }
    const exisitingUser = await findUserByEmail(email)
    if(exisitingUser){
      return res.status(400).json({error:'user already exist'})
    }
    const user = await saveUser(name,email,passWord)
    res.status(201).json({message:"User created successfully",user})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}
export const userLogin=async(req,res)=>{
    try{
     const {email,passWord}=req.body;
     const vaild= validateUserLoginSchema(email,passWord)
     if(!vaild){
        return res.status(400).json({error:'invalid data'})
     }
     const exisitingUser = await findUserByEmail(email)
     if(!exisitingUser){
       return res.status(400).json({error:'user not found'})
     }
     const isMatch = await comparePassword(passWord,exisitingUser.passWord)
     if(!isMatch){
        return res.status(400).json({error:'invalid password'})
     }
     const payload={
        exisitingUser
     }
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'12h'})
     res.status(200).json({message:"User logged in successfully",token})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}