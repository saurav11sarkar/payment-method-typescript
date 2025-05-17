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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email });
    if (user) {
        throw new appError_1.default(404, "User already exists");
    }
    const newUser = yield user_model_1.default.create(payload);
    return newUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return users;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    return user;
});
const updateUserById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    if (!result) {
        throw new appError_1.default(404, "User not found");
    }
    payload.password = yield bcryptjs_1.default.hash(payload.password, Number(config_1.default.round));
    const user = yield user_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    return user;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    if (!result) {
        throw new appError_1.default(404, "User not found");
    }
    const user = yield user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new appError_1.default(404, "User not found");
    }
    return user;
});
exports.userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
