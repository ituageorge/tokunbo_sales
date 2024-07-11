import mongoose from "mongoose";
// import User from "./User"

const DebtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amountPaid: Number,
  additionalDebt: {type: Number},
  newBalance: Number,
// }, {timestamps: {createdAt: "createdAt", updatedAt: "newBalance"}});
}, {timestamps: true});

const Debt = mongoose?.models?.Debt || mongoose.model("Debt", DebtSchema);

export { Debt };