import {model, models, Schema} from "mongoose";
import mongoose from 'mongoose';

const UserInfoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {type: String},
    email: {type: String, required: true},
    streetAddress: {type: String},
   postalCode: {type: String},
   city: {type: String},
   country: {type: String},
   admin: {type: Boolean, default: false},
   phone: {type: String},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema)