import { body } from "express-validator";

export const applicationValidation = [
  body("job")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid Job ID"),

  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),

  body("lastName")
    .optional({ values: "falsy" })
    .isLength({ min: 1 })
    .withMessage("Last name is invalid"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number must contain only numbers")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits"),

  body("country")
    .optional({ values: "falsy" })
    .isString(),

  body("state")
    .optional({ values: "falsy" })
    .isString(),

  body("place")
    .optional({ values: "falsy" })
    .isString(),

  body("experience")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("Experience must be a number"),

  body("additionalInfo")
    .optional({ values: "falsy" })
    .isLength({ max: 2000 })
    .withMessage("Additional info too long"),
];