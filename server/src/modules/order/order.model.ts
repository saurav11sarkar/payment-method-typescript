import mongoose from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    paidStatus: { type: Boolean, default: false },
    tranjectionId: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
