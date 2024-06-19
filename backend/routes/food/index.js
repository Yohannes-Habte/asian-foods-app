import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFood,
  updateFood,
} from "../../controllers/foodController/index.js";

const foodRouter = express.Router();

foodRouter.post("/new", createFood);
foodRouter.get("/", getAllFoods);
foodRouter.get("/:id", getFood);
foodRouter.put("/:id", updateFood);
foodRouter.delete("/:id", deleteFood);

export default foodRouter;
