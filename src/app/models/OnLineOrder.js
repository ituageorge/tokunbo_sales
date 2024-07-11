import mongoose from 'mongoose';

const OnLineOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartProducts: [
    {
      basePrice: Number,
      name: String,
      image: String,
      totalPriceOfProduct: Number,
      totalProductQty: Number,
      description: String,
      delivered: { type: Boolean, default: false },
    },
  ],
  address: {
    phone: String,
    streetAddress: String,
    city: String,
    country: String,
    postalCode: String,
  },
  subtotal: { type: Number },
  userName: {type: String},
  userImage:{type: String},
  
}, { timestamps: true });

const OnLineOrder = mongoose.models.OnLineOrder || mongoose.model('OnLineOrder', OnLineOrderSchema);

export { OnLineOrder };
