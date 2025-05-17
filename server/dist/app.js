"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const appError_1 = __importDefault(require("./error/appError"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// api routes
app.use("/api/v1", routes_1.default);
// not found route
app.use((req, res, next) => {
    next(new appError_1.default(404, "not found"));
});
// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err.error,
        stack: config_1.default.env === "development" ? err.stack : undefined,
    });
});
exports.default = app;
