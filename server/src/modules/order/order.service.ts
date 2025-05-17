import SSLCommerzPayment from "sslcommerz-lts";
import { IOrder } from "./order.interface";
import User from "../user/user.model";
import AppError from "../../error/appError";
import Order from "./order.model";
import { Types } from "mongoose";
import config from "../../config";

const createOrder = async (payload: IOrder, userContext: { userId: string }) => {
  const { userId } = userContext;
  const { amount, currency } = payload;
  const user = await User.findById(userId);

  if (!user) throw new AppError(404, "User not found");

  const tran_id = new Types.ObjectId().toString();

  const newOrder = new Order({
    ...payload,
    userId,
    paidStatus: false,
    tranjectionId: tran_id,
  });

  await newOrder.save();

  const sslcz = new SSLCommerzPayment(config.store_id!, config.store_password!, false);

  const paymentData = {
    total_amount: amount,
    currency: currency || "BDT",
    tran_id,
    success_url: `http://localhost:5000/api/v1/orders/success/${tran_id}`,
    fail_url: `http://localhost:5000/api/v1/orders/fail/${tran_id}`,

    // success_url: `https://payment-server-weld.vercel.app/api/v1/orders/success/${tran_id}`,
    // fail_url: `https://payment-server-weld.vercel.app/api/v1/orders/fail/${tran_id}`,

    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Product",
    product_category: "General",
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address || "Dhaka",
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: user.phone,
    ship_name: user.name,
    ship_add1: user.address || "Dhaka",
    ship_city: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
  };

  try {
    const response = await sslcz.init(paymentData as any);
    const { GatewayPageURL } = response;

    if (!GatewayPageURL) {
      await Order.deleteOne({ tranjectionId: tran_id });
      throw new AppError(500, "Payment initialization failed.");
    }

    return { url: GatewayPageURL };
  } catch (error) {
    await Order.deleteOne({ tranjectionId: tran_id });
    throw new AppError(500, "SSLCommerz error during order creation.");
  }
};

const successOrder = async (tran_id: string) => {
  const order = await Order.findOne({ tranjectionId: tran_id });
  if (!order) throw new AppError(404, "Order not found");

  const result = await Order.updateOne({ tranjectionId: tran_id }, { $set: { paidStatus: true } });

  if (result.modifiedCount > 0) return `http://localhost:3000/success/${tran_id}`;
  else throw new AppError(500, "Failed to update transaction.");
};

const failOrder = async (tran_id: string) => {
  const order = await Order.findOne({ tranjectionId: tran_id });
  if (!order) throw new AppError(404, "Order not found");

  const result = await Order.deleteOne({ tranjectionId: tran_id });

  if (result.deletedCount) return `http://localhost:3000/fail/${tran_id}`;
  else throw new AppError(500, "Failed to delete transaction.");
};

export const orderService = { createOrder, successOrder, failOrder };
