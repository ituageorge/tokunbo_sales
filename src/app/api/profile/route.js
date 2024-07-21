
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "../../models/User";
import { UserInfo } from "../../models/UserInfo";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const {_id, name, image, ...otherUserInfo} = data;

  let filter = {};
  if (_id) {
    filter = {_id};
  } else {
    const session = await getServerSession(authOptions);

    // console.log("sessionppp", session);

    const email = session.user.email;
    filter = {email};
  }

  const user = await User.findOne(filter);
  await User.updateOne(filter, {name, image});
  await UserInfo.findOneAndUpdate({email:user.email}, otherUserInfo, {upsert:true});

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = {_id};
  } else {
    const session = await getServerSession(authOptions);

    // console.log("sessionppp", session);

    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = {email};
  }

  const user = await User.findOne(filterUser).lean();
  // console.log('ueserr123', user._id);

  const userInfo = await UserInfo.findOne({email:user.email}).lean();
// console.log('uese3', userInfo._id);

  // return Response.json({...user,  userInfo: {...userInfo}});
  // return Response.json({...userInfo,  user: {...user}});
// 
  return Response.json({...userInfo,  ...user});

  // return Response.json({
  //   ...user,
  //   userId: user?._id, // Add _id to the response
  //   userInfo: {
  //     ...userInfo,
  //     _id: userInfo?._id, // Add _id to the response
  //   },
  // });

}