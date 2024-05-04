import {createBookshelf,findBookshelfByUser,deleteBookshelfByUser} from '../service/bookshelf.service.js';
import{ validateBookShelfSchema} from '../config/joi.js'
import{verifyCookie} from '../helper/veriftytoken.js'

export const saveBookshelf= async(req,res)=>{
    try{
        const {user,name,author,genre,description,image}=req.body;
        const vaild= validateBookShelfSchema(name,author,genre,description,image, categorie)
        if(!vaild){
            return res.status(400).json({error:'invalid data'})
        }
        const bookshelf = await createBookshelf(user,name,author,genre,description,image, categorie);
        if(!bookshelf){
            return res.status(400).json({error:'invalid data'})
        }
        return res.status(200).json({message:"Bookshelf saved successfully",data:bookshelf})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'internal server error'})
    }
}

export const getBookshelfByUser= async(req,res)=>{
    try{
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
  const bookshelf = await findBookshelfByUser(user._id);
  if(!bookshelf){
      return res.status(400).json({error:'no bookshelf found'})
  }
  return res.status(200).json({message:"Bookshelf found" ,bookshelf})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'internal server error'})
    }
}

export const deleteBookshelf= async(req,res)=>{
    try{
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
        const {bookshelfId}=req.params
        if(!bookshelfId){
            return res.status(400).json({error:'please provide a bookshelf'})
        }
        const bookshelf = await deleteBookshelfByUser(user._id,bookshelfId);
        if(!bookshelf){
            return res.status(400).json({error:'no bookshelf found'})
        }
        return res.status(200).json({message:"Bookshelf deleted" ,bookshelf})
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'internal server error'})
    }
}