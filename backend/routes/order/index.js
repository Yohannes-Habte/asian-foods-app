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
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
