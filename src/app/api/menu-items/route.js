import mongoose from 'mongoose';
import { MenuItem } from '../../models/MenuItem';
import { isAdmin } from '../auth/[...nextauth]/route';


export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  // console.log("data4menu-item", data)

  // Ensure category is a valid ObjectId or null
  if (data.category === "") {
    data.category = null;
    return new Response(JSON.stringify({ error: 'Choose a category' }), { status: 400 });
  }

  if (await isAdmin()) {
    try {
      const menuItemDoc = await MenuItem.create(data);
      return new Response(JSON.stringify({ message: 'Menu item created successfully' }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
  } else {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 403 });
  }
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const {_id, ...data} = await req.json();
    // console.log('data', data)
    await MenuItem.findByIdAndUpdate(_id, data, {upsert:true});
  }
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await MenuItem.find()
  );
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await MenuItem.deleteOne({_id});
  }
  return Response.json(true);
}