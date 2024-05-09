import {summarizeBook} from '../helper/hugging.js'

export const createSammary= async(req,res)=>{
    try{
    const {text}=req.body
    if(!text){
        return res.status(400).json({message:'Invalid parameters'})
    }
    const summary= await summarizeBook(text)
    if(!summary){
        return res.status(500).json({message:"Failed to generate summary"})
    }
    return res.status(200).json({message:"Summary created successfully"+ summary})
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}