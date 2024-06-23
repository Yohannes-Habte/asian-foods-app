import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
} from "../../controllers/commentController/index.js";
import { authAdmin, authUser } from "../../middleware/auth/index.js";
import requiredValues from "../../validators/requiredValue/index.js";
import commentValidator from "../../validators/comment/index.js";
import checkValidation from "../../validators/validationResult/index.js";


const commentRouter = express.Router();

commentRouter.post(
  "/new",
  requiredValues(["email", "comment"]),
  commentValidator(),
  checkValidation,
  createComment
);
commentRouter.get("/", getComments);
commentRouter.get("/:id",  getComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
