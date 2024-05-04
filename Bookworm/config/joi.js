import joi from 'joi';

const UserSchema= joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(5).max(20)
})

const UserLoginSchema= joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(5).max(20)
});

const bookShelf=joi.object({
  user:joi.string().required(),
  name:joi.string().required(),
  author:joi.string().required(),
  genre:joi.string().required(),
  description:joi.string().required(),
  image:joi.string().required()
});
export const validateUserSchema=(name,email,passWord)=>{
     try{
       const valid= UserSchema.validate(name,email,passWord);
       return valid;
     }catch(error){
         console.log(error)
     }
}

export const validateUserLoginSchema=(email,passWord)=>{
     try{
       const valid= UserLoginSchema.validate(email,passWord);
       return valid;
     }catch(error){
         console.log(error)
     }
}

export const validateBookShelfSchema=(user,name,author,genre,description,image)=>{
  try{
    const valid= bookShelf.validate(user,name,author,genre,description,image);
    return valid;
  }catch(error){
      console.log(error)
  }
}