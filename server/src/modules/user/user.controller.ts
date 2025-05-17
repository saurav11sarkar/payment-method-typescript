import catchAsync from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, 201, "User created successfully", result);
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();
  sendResponse(res, 200, "Users fetched successfully", result);
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  sendResponse(res, 200, "User fetched successfully", result);
});

const updateUserById = catchAsync(async (req, res) => {
  const result = await userService.updateUserById(req.params.id, req.body);
  sendResponse(res, 200, "User updated successfully", result);
});

const deleteUserById = catchAsync(async (req, res) => {
  const result = await userService.deleteUserById(req.params.id);
  sendResponse(res, 200, "User deleted successfully", result);
});

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
