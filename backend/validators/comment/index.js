import { check } from "express-validator";

const commentValidator = () => {
  return [
    check("email")
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is not valid"),

    check("comment")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 50, max: 900 })
      .withMessage("Text message should be between 50 and 900 characters"),
  ];
};

export default commentValidator;
