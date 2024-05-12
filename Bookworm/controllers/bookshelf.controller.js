import {createBookshelf,findBookshelfByUser,deleteBookshelfByUser} from '../service/bookshelf.service.js';
import{ validateBookShelfSchema} from '../config/joi.js'
import {authenticateUser} from '../helper/veriftytoken.js'

export const saveBookshelf= async(req,res)=>{
    try{
        const {name,author,genre,description,image,categorie}=req.body;
        const user = await authenticateUser(req.headers.authorization);
        if (!user) {
         return res.status(401).json({ error: 'Token authentication required' });
           }
        const vaild= validateBookShelfSchema(name,author,genre,description,image, categorie)
        if(!vaild){
            return res.status(400).json({error:'invalid data'})
        }
        const bookshelf = await createBookshelf(user._id,name,author,genre,description,image, categorie);
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
     const user = await authenticateUser(req.headers.authorization);
     if (!user) {
      return res.status(401).json({ error: 'Token authentication required' });
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
        const user = await authenticateUser(req.headers.authorization);
        if (!user) {
         return res.status(401).json({ error: 'Token authentication required' });
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