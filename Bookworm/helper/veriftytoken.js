import jwt from 'jsonwebtoken';

export const verifyCookie= (token)=>{
    try{
        const decode= jwt.verify(token, process.env.jwt_key)
       return decode
    }catch(error){
        console.log(error);
        return error.message
    }

}