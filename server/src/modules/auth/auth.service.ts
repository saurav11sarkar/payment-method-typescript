import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcryptjs";
import config from "../../config";
import jwt from "jsonwebtoken";
import AppError from "../../error/appError";

const login = async (payload: Partial<IUser>) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(
    payload.password as string,
    user.password as string
  );
  if (!isPasswordCorrect) {
    throw new AppError(401, "Password is incorrect");
  }
  if (user.status !== "active") {
    throw new AppError(401, "Your account is not active");
  }
  const token = jwt.sign(
    { id: user._id, email: user.email, status: user.status },
    config.jwt_secret as string,
    {
      expiresIn: "1d",
    }
  );
  return { token };
};

export const authService = {
  login,
};
