import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export const POST = async(req, res) => {
    const {name} = await req.json();
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc);
}

export const PUT = async(req, res) => {
  mongoose.connect(process.env.MONGO_URL);
    const {_id, name} = await req.json();
    await Category.updateOne({_id}, {name})
    return Response.json(true);
}

export const GET = async(req, res) => {
    return Response.json(
      await Category.find()
    );
  }

  export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    // if (await isAdmin()) {
      await Category.deleteOne({_id});
    // }
    return Response.json(true);
  }