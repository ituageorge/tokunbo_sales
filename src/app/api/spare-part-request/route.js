import mongoose from "mongoose";
import { SparePartRequest } from "../../models/SparePartRequest";
import { User } from "../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from "../../models/UserInfo";


export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  // console.log("uuserrI234", email);

  const user = await User.findOne({email});
  const userInfo = await UserInfo.findOne({email: email});
  // console.log("ueseerInfo", userInfo)
  const {city, country, createdAt, phone, postalCode, streetAddress, userId} = userInfo;

  const filterUser = { userId: user._id };
  // console.log("userfilter", filterUser)


  try {
  const {
    sparePartDescription,
    sparePartImage,
    modelOfVehiclePart,
    nameOfPart,
  } = data;

  // console.log("req-bbody", data)

  const newPartRequest = new SparePartRequest({
    sparePartDescription,
    sparePartImage,
    modelOfVehiclePart,
    nameOfPart,
    userId
  });

  await newPartRequest.save();

  return Response.json({
    message: "Request saved successfully.",
    //  data
  });
} catch (error) {
    console.error("Request error", error);   
    return Response.json(
        { error: "An error occurred while saving the request." },
        { status: 500 }
      );
}}

export async function GET(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Get user session
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found.' }),
        { status: 404 }
      );
    }

    // Find spare part requests by userId
    const requests = await SparePartRequest.find({ userId: user._id });

    // Return the requests
    return new Response(
      JSON.stringify(requests),
      { status: 200 }
    );
  } catch (error) {
    console.error('Request error', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while fetching the requests.' }),
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Get user session
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Request not found.' }),
        { status: 404 }
      );
    }

    // Get request ID from the URL
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('id');

    // Delete the request
    await SparePartRequest.deleteOne({ _id: requestId, userId: user._id });

    return new Response(
      JSON.stringify({ message: 'Request deleted successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete request error', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while deleting the request.' }),
      { status: 500 }
    );
  }
}