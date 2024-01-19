import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export async function PUT(req, res) {
mongoose.connect(process.env.MONGO_URL);
const data = await req.json();
const session = await getServerSession(authOptions);
// console.log('apiProfileSession', session);
// console.log({data, session});

const email = session?.user?.email;


  // update user
  await User.updateOne({email}, data);


 return Response.json(true);
}

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  // console.log({data, session});
  
  const email = session?.user?.email;

  return Response.json(
    await User.findOne({ email })
  );
}