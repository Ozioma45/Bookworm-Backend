import mongoose from "mongoose";

const  categorieSchema= mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, name:{
        type:String,
        required:true
    }
})

const Categorie= mongoose.model('Categorie',categorieSchema);

export default Categorie;