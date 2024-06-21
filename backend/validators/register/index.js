import { check } from "express-validator";

const registerValidator = () => {
  return [
    check("firstName")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 2, max: 15 })
      .withMessage("First name must be between 2 and 15 characters"),

    check("lastName")
      .notEmpty()
      .trim()
      .escape()
      .isLength({ min: 30, max: 200 })
      .withMessage("Text message should be between 30 and 200 characters"),

    check("email")
      .isEmail()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is not valid"),

    check("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .notEmpty()
      .withMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  ];
};

export default registerValidator;
