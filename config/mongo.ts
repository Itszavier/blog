import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DATABASE_URI as string).then(() => {
 console.log('connected to database')
}).catch(error  => {
  console.log(error)
})

export default mongoose;