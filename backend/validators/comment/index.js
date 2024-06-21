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
      .isLength({ min: 30, max: 200 })
      .withMessage("Text message should be between 30 and 200 characters"),
  ];
};

export default commentValidator;
