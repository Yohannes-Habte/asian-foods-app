import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
} from "../../controllers/orderController/index.js";
import { authAdmin, authUser } from "../../middleware/auth/index.js";

const orderRouter = express.Router();

orderRouter.post("/new", createOrder);
orderRouter.get("/", authAdmin, getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.delete("/:id", authAdmin, deleteOrder);

export default orderRouter;
