import mongoose from 'mongoose';
import { SparePartRequest } from '../../../models/SparePartRequest';
// import { User } from "../../../models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"
import { UserInfo } from "../../../models/UserInfo";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Get request ID from the URL
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('id');

    // Find the request by ID
    const request = await SparePartRequest.findById(requestId);

    if (!request) {
      return new Response(
        JSON.stringify({ error: 'Request not found.' }),
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const name = session.user.name;
    const image = session.user.image;

    // console.log("usseerrI2", email);
  
    // const user = await User.findOne({email});
    const userInfo = await UserInfo.findOne({email: email});
    // console.log("ueseerInfo", userInfo)
    const {city, country, phone, postalCode, streetAddress} = userInfo;
  
    const responsePayload = {
        ...request.toObject(),
        name,
        image,
        city,
        country,
        phone,
        postalCode,
        streetAddress,
      };
  

    return new Response(
        JSON.stringify(responsePayload),
        { status: 200 }
    );
  } catch (error) {
    console.error('Get request error', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while fetching the request.' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // Get request ID from the URL
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('id');

    // Delete the request by ID
    const result = await SparePartRequest.deleteOne({ _id: requestId });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: 'Request not found.' }),
        { status: 404 }
      );
    }

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
