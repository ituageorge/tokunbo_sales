import { User } from "../../models/User";
import mongoose from "mongoose";


export const GET = async() => {
    // mongoose.connect(process.env.MONGO_URL); 
    // mongoose connection setup in your app
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URI environment variable is not set');
      }

mongoose.connect(process.env.MONGO_URL, {

    serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
  });

  const users = await User.find({}, 'name email'); // Only select the necessary fields

    // const users = await User.find().select('-password -__v'); // exclude password and __v fields

    return Response.json(users)
}
    //   const data = await getData();
