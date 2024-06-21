import express from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
  getFood,
  updateFood,
} from "../../controllers/foodController/index.js";
import requiredValues from "../../validators/requiredValue/index.js";
import productValidator from "../../validators/product/index.js";
import checkValidation from "../../validators/validationResult/index.js";


const foodRouter = express.Router();

foodRouter.post(
  "/new",
  requiredValues([
    "food_name",
    "food_price",
    "description",
    "country",
    "spiceLevel",
    "image",
  ]),
  productValidator(),
  checkValidation,
  createFood
);
foodRouter.get("/", getAllFoods);
foodRouter.get("/:id", getFood);
foodRouter.put("/:id", updateFood);
foodRouter.delete("/:id", deleteFood);

export default foodRouter;
