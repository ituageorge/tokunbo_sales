import mongoose from "mongoose";

import { User } from "../../../models/User" 
import { getServerSession } from "next-auth";
import { OnLineOrder } from "../../../models/OnLineOrder";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  const user = await User.findOne({email});
  
  const filterUser = { userId: user._id };
  try {
    const onlineOrder = await OnLineOrder.find(filterUser);
  
    if (!onlineOrder) {
        return Response.json({ error: "Order not found" });
       } else {
        return Response.json(onlineOrder);
       }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching order" });
  }

}