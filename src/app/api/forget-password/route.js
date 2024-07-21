import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../../models/User";
import crypto from 'crypto';

import nodemailer from 'nodemailer';
// import Link from "next/link";
require("dotenv").config();

const sendEmail = async (email, subject, resetToken) => {
    try {

        
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ituaosagie100@gmail.com",
    pass: "byfhalxmekshdcvs",
},
  });

        await transporter.sendMail({
            from: "ituaosagie100@gmail.com",
            to: email,
            subject: subject,
            // text: text,
            // text: `Reset your password by clicking this link: ${text}`,
            // text: `Reset your password by clicking this link: <Link href="${text}">Click here</Link>`,
            html: `
            <p>Reset your password by clicking this link:</p>
          <a href ='http://${resetToken}?email=${email}'}> fgfggfg </a>
           
          `,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent", error);
    }
};



export const POST = async (req) => {
  const { email } = await req.json();

  mongoose.connect(process.env.MONGO_URL);

  const existingUser = await User.findOne({ email });
  // console.log('eemaal', existingUser)

  if (!existingUser) {
    return new NextResponse("Email does not exist", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  // console.log('rres', resetToken)
 const passwordResetToken = crypto
 .createHash("sha256")
 .update(resetToken)
 .digest("hex");

 const passwordResetExpires = Date.now() + 3600000;

 existingUser.resetToken = passwordResetToken;
 existingUser.resetTokenExpiry = passwordResetExpires;

 const resetUrl = `localhost:3000/reset-password/${resetToken}`;
  // console.log("resetUrl", resetUrl) //localhost:3000/reset-password/e1d64505948c09ce62ea1e1f4e243cee38e5383f

  await sendEmail(email, "Password reset", resetUrl, resetToken);

  return Response.json({
    message: "password reset link sent to your email account.",
    // data: existingUser.email
  });
  // res.send("password reset link sent to your email account");
};