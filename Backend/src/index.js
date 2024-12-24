import mongoose from "mongoose"
import DB_NAME from "./constants"

;( async ()=>{

  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
  }
  catch(err){
    console.log("Error : ",err);
    throw err
    
  }
})()