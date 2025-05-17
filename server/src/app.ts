import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AppError from "./error/appError";
import config from "./config";
import router from "./routes/routes";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api/v1", router);

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, "not found"));
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.error,
    stack: config.env === "development" ? err.stack : undefined,
  });
});

export default app;
