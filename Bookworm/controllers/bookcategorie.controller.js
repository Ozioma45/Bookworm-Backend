import {createCategorie, findCategorieByUser,findCategorieById,findCategorieAndDelete}  from '../service/bookcategorie.service.js';
import {verifyCookie} from '../helper/veriftytoken.js'

export const createCategories=async(req,res)=>{
   try{
    const {name}= req.body;
    if(!name){
        return res.status(400).json({error:'invalid data'})
    }
    const authHeader= req.headers.authorization
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) { 
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await verifyCookie(token);
    if(!user){
      return res.status(401).json({error:'TOken auth required'})
    }

    const existingCategory= await findCategorieByUser(user.exisitingUser._id,name)
    if(existingCategory){
        return res.status(400).json({error:'categorie already exists'})
    }
    const categorie = await createCategorie(user.exisitingUser._id,name);
    if(!categorie){
        return res.status(400).json({error:'Something went wrong'})
    }
    return res.status(200).json({message:"categorie created"})
   }catch(error){
     res.status(500).json({error:error.message})
   }
}

export const findCategories=async(req,res)=>{
   try{
    const authHeader= req.headers.authorization
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) { 
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await verifyCookie(token);
    if(!user){
      return res.status(401).json({error:'TOken auth required'})
    }
    const categories = await findCategorieById(user.exisitingUser._id);
    if(!categories){
        return res.status(400).json({error:'Something went wrong'})
    }
    return res.status(200).json({message:"categories found",categories})
   }catch(error){
     res.status(500).json({error:error.message})
   }
}

export const deleteCategories=async(req,res)=>{
    try{
     const authHeader= req.headers.authorization
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) { 
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await verifyCookie(token);
    if(!user){
      return res.status(401).json({error:'TOken auth required'})
    }
    const {name}= req.body;
    if(!name){
        return res.status(400).json({error:'invalid data'})
    }
    const categorie = await findCategorieAndDelete(user.exisitingUser._id,name);
    if(!categorie){
        return res.status(400).json({error:'Something went wrong'})
    }
    return res.status(200).json({message:"categorie deleted"})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}