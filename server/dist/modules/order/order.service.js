"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const user_model_1 = __importDefault(require("../user/user.model"));
const appError_1 = __importDefault(require("../../error/appError"));
const order_model_1 = __importDefault(require("./order.model"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const createOrder = (payload, userContext) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = userContext;
    const { amount, currency } = payload;
    const user = yield user_model_1.default.findById(userId);
    if (!user)
        throw new appError_1.default(404, "User not found");
    const tran_id = new mongoose_1.Types.ObjectId().toString();
    const newOrder = new order_model_1.default(Object.assign(Object.assign({}, payload), { userId, paidStatus: false, tranjectionId: tran_id }));
    yield newOrder.save();
    const sslcz = new sslcommerz_lts_1.default(config_1.default.store_id, config_1.default.store_password, false);
    const paymentData = {
        total_amount: amount,
        currency: currency || "BDT",
        tran_id,
        // success_url: `http://localhost:5000/api/v1/orders/success/${tran_id}`,
        // fail_url: `http://localhost:5000/api/v1/orders/fail/${tran_id}`,
        success_url: `https://payment-server-weld.vercel.app/api/v1/orders/success/${tran_id}`,
        fail_url: `https://payment-server-weld.vercel.app/api/v1/orders/fail/${tran_id}`,
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
        const response = yield sslcz.init(paymentData);
        const { GatewayPageURL } = response;
        if (!GatewayPageURL) {
            yield order_model_1.default.deleteOne({ tranjectionId: tran_id });
            throw new appError_1.default(500, "Payment initialization failed.");
        }
        return { url: GatewayPageURL };
    }
    catch (error) {
        yield order_model_1.default.deleteOne({ tranjectionId: tran_id });
        throw new appError_1.default(500, "SSLCommerz error during order creation.");
    }
});
const successOrder = (tran_id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOne({ tranjectionId: tran_id });
    if (!order)
        throw new appError_1.default(404, "Order not found");
    const result = yield order_model_1.default.updateOne({ tranjectionId: tran_id }, { $set: { paidStatus: true } });
    // if (result.modifiedCount > 0) return `http://localhost:3000/success/${tran_id}`;
    if (result.modifiedCount > 0)
        return `https://payment-client.vercel.app/success/${tran_id}`;
    else
        throw new appError_1.default(500, "Failed to update transaction.");
});
const failOrder = (tran_id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOne({ tranjectionId: tran_id });
    if (!order)
        throw new appError_1.default(404, "Order not found");
    const result = yield order_model_1.default.deleteOne({ tranjectionId: tran_id });
    // if (result.deletedCount) return `http://localhost:3000/fail/${tran_id}`;
    if (result.deletedCount)
        return `https://payment-client.vercel.app/fail/${tran_id}`;
    else
        throw new appError_1.default(500, "Failed to delete transaction.");
});
exports.orderService = { createOrder, successOrder, failOrder };
