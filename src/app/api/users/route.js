import { User } from "@/app/models/User";
import mongoose from "mongoose";


export const GET = async(req, res) => {
    mongoose.connect(process.env.MONGO_URL); 
    const users = await User.find()
    return Response.json(users)
}
    //   const data = await getData();
