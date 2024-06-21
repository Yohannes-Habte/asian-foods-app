import { check } from "express-validator";

const productValidator = () => {
  return [
    check("food_name")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage("Food name must be between 2 and 30 characters"),

    check("food_price")
      .isNumeric()
      .isFloat({ min: 5, max: 50 })
      .trim()
      .escape()
      .withMessage("Food price must be between 5 and 50!"),

    check("description")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 100, max: 500 })
      .withMessage(
        "Food description must be between 100 and 500 characters"
      ),

    check("country")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage("Country name should be between 2 and 30 characters"),

    check("spiceLevel")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage("Spice level name should be between 2 and 30 characters"),

    check("image").notEmpty().withMessage("Image field must not be empty"),
  ];
};

export default productValidator;
