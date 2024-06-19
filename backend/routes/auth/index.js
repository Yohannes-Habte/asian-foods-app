import express from "express";
import {
  createAccount,
  deleteUser,
  loginUser,
  updateUser,
  userLogout,
} from "../../controllers/authController/index.js";

const authRouter = express.Router();

authRouter.post("/register", createAccount);
authRouter.post("/login", loginUser);
authRouter.put("/:id", updateUser);
authRouter.delete("/:id", deleteUser);
authRouter.get("/logout", userLogout);

export default authRouter;
