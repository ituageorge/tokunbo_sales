import {model, models, Schema} from "mongoose";
import mongoose from 'mongoose';

const SparePartRequestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sparePartDescription: {
    type: String,
    // required: true,
  },
  sparePartImage: {
    type: String, // URL of the uploaded image
    // required: true,
  },
  modelOfVehiclePart: {
    type: String,
  },
  nameOfPart: {
    type: String,
  },
}, {timestamps: true});

export const SparePartRequest = models?.SparePartRequest || model('SparePartRequest', SparePartRequestSchema)