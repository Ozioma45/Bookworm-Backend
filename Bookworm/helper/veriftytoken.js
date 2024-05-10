import jwt from 'jsonwebtoken';

export const verifyCookie= (token)=>{
    try{
        const decode= jwt.verify(token, process.env.JWT_SECRET)
       return decode
    }catch(error){
        console.log(error);
        return error.message
    }

}