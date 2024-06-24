import express from "express";
import { getUser, getUsers } from "../../controllers/userController/index.js";
import { authAdmin } from "../../middleware/auth/index.js";

const userRouter = express.Router();

userRouter.get("/", authAdmin, getUsers);
userRouter.get("/:id", authAdmin, getUser);

export default userRouter;
