import mongoose from "mongoose";
import { User } from "../../models/User"

// import { UserInfo } from "../../models/UserInfo";
// import { MenuItem } from "../../models/MenuItem";
import { OnLineOrder } from "../../models/OnLineOrder";

import {getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const data = await req.json();
  const { address, cartProducts, subtotal, userId, userName, userImage } = data;

  // Check if an order for the user already exists
  const existingOrder = await OnLineOrder.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (existingOrder) {
    // Update the existing order with new cart products and subtotal
    existingOrder.cartProducts = existingOrder.cartProducts.concat(cartProducts);
    existingOrder.subtotal += subtotal;

    try {
      await existingOrder.save();
      return new Response(JSON.stringify({ message: "Order updated successfully!" }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Error updating order" }), { status: 500 });
    }
  } else {
    // Create a new order
    const newOrder = new OnLineOrder({
      address: {
        phone: address.phone,
        streetAddress: address.streetAddress,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
      },
      cartProducts: cartProducts.map((product) => ({
        basePrice: product.basePrice,
        name: product.name,
        image: product.image,
        totalPriceOfProduct: product.totalPriceOfProduct,
        totalProductQty: product.totalProductQty,
        description: product.description,
      })),
      subtotal,
      userName,
      userImage,
      userId: new mongoose.Types.ObjectId(userId),
    });

    try {
      await newOrder.save();
      return new Response(JSON.stringify({ message: "Order placed successfully!" }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Error placing order" }), { status: 500 });
    }
  }
}


export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const email = session.user.email;
 
  const user = await User.findOne({email});

const filterUser = { userId: user._id };


// const {name, image, _id} = user;
// console.log("name222", name);
// console.log("image222", image);
// console.log("userId2223", _id.toString())

  try {
    const onlineOrder = await OnLineOrder.findOne(filterUser).lean();

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


export const PATCH = async (req) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    const { productId, delivered } = await req.json();

    if (!productId) {
      return  Response.json({ error: "Product ID is required" });
    }

    const filter = { "cartProducts._id": new mongoose.Types.ObjectId(productId) };
    const update = { $set: { "cartProducts.$.delivered": delivered } };

    const onlineOrder = await OnLineOrder.findOneAndUpdate(filter, update, { new: true });
    if (!onlineOrder) {
      return  Response.json({ error: "Order not found" });
    }

    return  Response.json(onlineOrder);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error updating order" });
  }
};

export const DELETE = async (req) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { productId } = await req.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
    }

    const product = await OnLineOrder.findOne({ "cartProducts._id": new mongoose.Types.ObjectId(productId) }, { "cartProducts.$": 1 });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    const productPrice = product.cartProducts[0].totalPriceOfProduct;

    // Pull the product from cartProducts array and decrease subtotal
    const update = { $pull: { cartProducts: { _id: new mongoose.Types.ObjectId(productId) } }, $inc: { subtotal: -productPrice } };

    const onlineOrder = await OnLineOrder.findOneAndUpdate({}, update, { new: true });

    if (!onlineOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }

    // Check if cartProducts array is empty after the update
    if (onlineOrder.cartProducts.length === 0) {
      await OnLineOrder.deleteOne({ _id: onlineOrder._id });
      return new Response(JSON.stringify({ message: "Order deleted as there were no products left" }), { status: 200 });
    }

    return new Response(JSON.stringify(onlineOrder), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error deleting product" }), { status: 500 });
  }
};