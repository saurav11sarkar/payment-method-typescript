import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth, orderController.createOrder);
router.post("/success/:tran_id", orderController.successOrder);
router.post("/fail/:tran_id", orderController.failOrder);

export const OrderRoutes = router;
