import mongoose from 'mongoose';
import User from './user.js';

const bookshelf= mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Bookshelf= mongoose.model('Bookshelf',bookshelf);

export default Bookshelf;