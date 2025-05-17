import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/create-user", userController.createUser);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUserById);
router.delete("/:id", auth, userController.deleteUserById);

export const UserRoutes = router;
