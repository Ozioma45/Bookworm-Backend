import bcryptjs from 'bcryptjs';

export const hashPassword =async(passWord)=>{
    try{
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(passWord, salt);
        return hashedPassword;
    }catch(error){
        console.log(error);
    }
}

export const comparePassword = async(passWord, hashedPassword)=>{
    try{
        const match= await bcryptjs.compare(passWord, hashedPassword);
        return match;
    }catch(error){
        console.log(error);
    }
}