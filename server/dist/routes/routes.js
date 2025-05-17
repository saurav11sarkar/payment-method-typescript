"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = express_1.default.Router();
router.use("/auth", auth_routes_1.AuthRoutes);
router.use("/users", user_routes_1.UserRoutes);
router.use("/orders", order_routes_1.OrderRoutes);
exports.default = router;
