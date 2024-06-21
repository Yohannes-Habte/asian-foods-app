import express from "express";
import {
  createAccount,
  deleteUser,
  loginUser,
  updateUser,
  userLogout,
} from "../../controllers/authController/index.js";
import requiredValues from "../../validators/requiredValue/index.js";
import registerValidator from "../../validators/register/index.js";
import checkValidation from "../../validators/validationResult/index.js";
import { authAdmin, authUser } from "../../middleware/auth/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  requiredValues(["firstName", "lastName", "email", "password"]),
  registerValidator(),
  checkValidation,
  createAccount
);
authRouter.post("/login", loginUser);
authRouter.put("/:id", authUser, updateUser);
authRouter.delete("/:id", authAdmin, deleteUser);
authRouter.get("/logout", userLogout);

export default authRouter;
