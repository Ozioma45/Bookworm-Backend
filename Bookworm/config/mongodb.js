import mongoose from "mongoose";

const connectDb=async()=>{
try{
  await mongoose.connect(process.env.mongodbSting)
  console.log('Database connection established')
}catch(error){
    console.log(error);
}
}

export default connectDb;