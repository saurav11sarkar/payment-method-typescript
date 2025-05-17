"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../../error/appError"));
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default(401, "Password is incorrect");
    }
    if (user.status !== "active") {
        throw new appError_1.default(401, "Your account is not active");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, status: user.status }, config_1.default.jwt_secret, {
        expiresIn: "1d",
    });
    return { token };
});
exports.authService = {
    login,
};
