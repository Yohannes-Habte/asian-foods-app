import express from "express";
import { getUser, getUsers } from "../../controllers/userController/index.js";
import { authAdmin } from "../../middleware/auth/index.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

export default userRouter;
