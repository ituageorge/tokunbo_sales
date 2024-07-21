import { User } from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
// import { useSearchParams } from "next/navigation";

// import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { password, email } = await request.json();
  
  mongoose.connect(process.env.MONGO_URL);

  if (!password?.length || password.length < 5) {
    new Error('password must be at least 5 characters');
  }

// console.log("existingEEmaill", email);

 const existingUser = await User.findOne({email});
//  console.log("existingUser222", existingUser)

 const salt = bcrypt.genSaltSync(10);
 existingUser.password = bcrypt.hashSync(password, salt);
//  const hashedPassword = await bcrypt.hash(password, 5);
//  existingUser.password = hashedPassword;

 existingUser.resetToken = undefined;
 existingUser.resetTokenExpiry = undefined;

 try{
    await existingUser.save();
    return Response.json("User's password is updated.", {status: 200});

 } catch (err) {
    return Response.json(err, {status: 500});
 }

}