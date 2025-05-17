import catchAsync from "../../utils/catchAsycn";
import { orderService } from "./order.service";

export const orderController = {
  createOrder: catchAsync(async (req, res) => {
    const result = await orderService.createOrder(req.body, {
      userId: req.user?.id,
    });
    res
      .status(200)
      .json({ success: true, message: "Order created", data: result });
  }),

  successOrder: catchAsync(async (req, res) => {
    const result = await orderService.successOrder(req.params.tran_id);
    res.redirect(result);
  }),

  failOrder: catchAsync(async (req, res) => {
    const result = await orderService.failOrder(req.params.tran_id);
    res.redirect(result);
  }),
};
