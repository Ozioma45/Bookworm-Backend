import {saveUser,findUserByEmail,findUserAndUpdate} from '../service/user.service.js';
import {validateUserSchema, validateUserLoginSchema} from '../config/joi.js';
import {verifyCookie} from '../helper/veriftytoken.js'
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
        const authHeader = req.headers.authorization;
        if(!authHeader){
          return res.status(401).json({error:'TOken auth required'})
        }
        const [bearer, token] = authHeader.split(' '); 
        if (bearer !== 'Bearer' || !token) { 
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await verifyCookie(token);
        if(!user){
          return res.status(401).json({error:'TOken auth required'})
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