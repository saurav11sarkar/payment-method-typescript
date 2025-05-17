"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../error/appError"));
const auth = (req, res, next) => {
    var _a;
    try {
        const tokenHeader = req.headers.authorization;
        const token = (tokenHeader === null || tokenHeader === void 0 ? void 0 : tokenHeader.startsWith("Bearer")) ? tokenHeader.split(" ")[1] : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return next(new appError_1.default(401, "Unauthorized access."));
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new appError_1.default(401, "Invalid or expired token."));
    }
};
exports.default = auth;
