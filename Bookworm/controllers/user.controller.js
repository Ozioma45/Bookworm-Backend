import {saveUser,findUserByEmail,findUserAndUpdate,updateUserPassword} from '../service/user.service.js';
import {validateUserSchema, validateUserLoginSchema} from '../config/joi.js';
import {authenticateUser} from '../helper/veriftytoken.js'
import {comparePassword} from '../config/bcryptjs.js';
import cloudinary from '../config/cloudinary.js';
import { singleUpload } from '../config/multer.js'; 
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
export const findUserEmail=async(req, res) => {
    try{
       const {email}=req.body;
       const user = await findUserByEmail(email)
       if(!user){
         return res.status(400).json({error:'user not found'})
       }
       const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1h'})
       return res.status(200).json({message:'User found successfully',token:token})
    }catch(error){
      res.status(500).json({error:error.message})
    }
}

export const updatePassword=async(req, res) => {
  try{
    const user = await authenticateUser(req.headers.authorization);
     if (!user) {
      return res.status(401).json({ error: 'Token authentication required' });
        }
    const {passWord}=req.body;
    await updateUserPassword(user,passWord)
    return res.status(200).json({success:'Success' , message: "passWord updated successfully"})  
  }catch(error){
    res.status(500).json({error:error.message})
  }
}
export const addProfilePicture = async(req, res) =>{
  try {
    singleUpload(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: "Error uploading image", error: error });
        }
        
        const file = req.file; // Access the single file
        
        if (!file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const uploadImage = await cloudinary.uploader.upload(file.path);

        if (!uploadImage) {
            return res.status(400).json({ message: "Image upload failed" });
        }

        const imageUrl = uploadImage.secure_url;
        const user = await authenticateUser(req.headers.authorization);
       if (!user) {
      return res.status(401).json({ error: 'Token authentication required' });
        }
        const updatedUser = await findUserAndUpdate(user._id,imageUrl)
        if(!updatedUser){
          return res.status(401).json({error:'Something went wrong'})
        }
        return res.status(200).json({ message: "Image uploaded successfully",});

    });
} catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Internal server error" });
}
}