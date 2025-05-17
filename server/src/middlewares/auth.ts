import { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../error/appError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader?.startsWith("Bearer") ? tokenHeader.split(" ")[1] : req.cookies?.token;

    if (!token) {
      return next(new AppError(401, "Unauthorized access."));
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid or expired token."));
  }
};

export default auth;
