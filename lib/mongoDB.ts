import mongoose from "mongoose";

let isConnected : boolean = false

export const connectToDB = async() => {
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('connected successfully');
        return;
    }
  try {
    await mongoose.connect(process.env.MONGO_URL || "",
        {
            dbName:"cinema",
        }
    );
    isConnected=true,
    console.log('connected')
  } catch (error) {
    console.error(error)
  }
}