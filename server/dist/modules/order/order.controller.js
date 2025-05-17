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
exports.orderController = void 0;
const catchAsycn_1 = __importDefault(require("../../utils/catchAsycn"));
const order_service_1 = require("./order.service");
exports.orderController = {
    createOrder: (0, catchAsycn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const result = yield order_service_1.orderService.createOrder(req.body, {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        res
            .status(200)
            .json({ success: true, message: "Order created", data: result });
    })),
    successOrder: (0, catchAsycn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_service_1.orderService.successOrder(req.params.tran_id);
        res.redirect(result);
    })),
    failOrder: (0, catchAsycn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order_service_1.orderService.failOrder(req.params.tran_id);
        res.redirect(result);
    })),
};
