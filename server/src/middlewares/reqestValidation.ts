import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import AppError from "../error/appError";

const validation = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      next(new AppError(400, "validation error", error));
    }
  };
};

export default validation;
