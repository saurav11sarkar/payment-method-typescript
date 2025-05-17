"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-user", user_controller_1.userController.createUser);
router.get("/", auth_1.default, user_controller_1.userController.getAllUsers);
router.get("/:id", auth_1.default, user_controller_1.userController.getUserById);
router.put("/:id", auth_1.default, user_controller_1.userController.updateUserById);
router.delete("/:id", auth_1.default, user_controller_1.userController.deleteUserById);
exports.UserRoutes = router;
