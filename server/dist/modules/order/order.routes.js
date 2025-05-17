"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", auth_1.default, order_controller_1.orderController.createOrder);
router.post("/success/:tran_id", order_controller_1.orderController.successOrder);
router.post("/fail/:tran_id", order_controller_1.orderController.failOrder);
exports.OrderRoutes = router;
