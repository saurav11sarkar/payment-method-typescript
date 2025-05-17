import config from "../../config";
import catchAsync from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: config.env === "production",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, 200, "Login successful", result);
});

export const authController = {
  login,
};
