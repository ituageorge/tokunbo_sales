import { User } from "../../models/User";
import mongoose from "mongoose";


export const GET = async() => {
    mongoose.connect(process.env.MONGO_URL); 
    const users = await User.find().select('-password -__v'); // exclude password and __v fields

    return Response.json(users)
}
    //   const data = await getData();
