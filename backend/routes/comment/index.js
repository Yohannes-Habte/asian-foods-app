import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
} from "../../controllers/commentController/index.js";
import { authAdmin } from "../../middleware/auth/index.js";

const commentRouter = express.Router();

commentRouter.post("/new", createComment);
commentRouter.get("/", getComments);
commentRouter.get("/:id", getComment);
commentRouter.delete("/:id", deleteComment );

export default commentRouter;
