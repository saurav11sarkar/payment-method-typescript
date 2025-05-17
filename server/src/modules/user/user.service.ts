import config from "../../config";
import AppError from "../../error/appError";
import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(404, "User already exists");
  }
  const newUser = await User.create(payload);
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const updateUserById = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(404, "User not found");
  }
  payload.password = await bcrypt.hash(
    payload.password as string,
    Number(config.round)
  );
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const deleteUserById = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(404, "User not found");
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
