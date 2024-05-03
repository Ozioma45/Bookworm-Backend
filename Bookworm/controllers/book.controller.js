import {getAllBooks,searchBooksByTitle} from '../helper/bookapi.js';

export const getBooks = async(req,res)=>{
    try{
        const books = await getAllBooks();
        if(!books){
            return res.status(400).json({error:'no books found'})
        }
        return res.status(200).json(books)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'internal server error'})
    }
}

export const searchBooks = async(req,res)=>{
    try{
        const {title}=req.body;
        const books = await searchBooksByTitle(title);
        if(!books){
            return res.status(400).json({error:'no books found'})
        }
        return res.status(200).json(books)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'internal server error'})
    }
}