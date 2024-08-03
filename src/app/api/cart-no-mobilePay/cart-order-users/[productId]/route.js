import mongoose from 'mongoose';
import { OnLineOrder } from '../../../../models/OnLineOrder'; // Adjust the path as necessary

export async function PATCH(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { productId } = req.query;
    const { delivered } = await req.json();

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const filter = { "cartProducts._id": mongoose.Types.ObjectId(productId) };
    const update = { $set: { "cartProducts.$.delivered": delivered } };

    const onlineOrder = await OnLineOrder.findOneAndUpdate(filter, update, { new: true });
    if (!onlineOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(onlineOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating order" });
  }
}

export async function DELETE(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const update = { $pull: { cartProducts: { _id: mongoose.Types.ObjectId(productId) } } };

    const onlineOrder = await OnLineOrder.findOneAndUpdate({}, update, { new: true });
    if (!onlineOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(onlineOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting product" });
  }
}
