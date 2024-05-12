import {createCategorie, findCategorieByUser,findCategorieById,findCategorieAndDelete}  from '../service/bookcategorie.service.js';
import {authenticateUser} from '../helper/veriftytoken.js'

export const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        const user = await authenticateUser(req.headers.authorization);
        if (!user) {
            return res.status(401).json({ error: 'Token authentication required' });
        }
        const existingCategory = await findCategorieByUser(user._id, name);
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }
        const category = await createCategorie(user._id, name);
        if (!category) {
            return res.status(400).json({ error: 'Something went wrong' });
        }
        return res.status(200).json({ message: 'Category created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const findCategories=async(req,res)=>{
   try{
    const user = await authenticateUser(req.headers.authorization);
    if (!user) {
        return res.status(401).json({ error: 'Token authentication required' });
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
     const user = await authenticateUser(req.headers.authorization);
    if (!user) {
       return res.status(401).json({ error: 'Token authentication required' });
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