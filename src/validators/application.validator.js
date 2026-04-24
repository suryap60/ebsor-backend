import { body } from "express-validator";

export const applicationValidation = [
  body("job")
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid Job ID"),

  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("resume")
    .optional()
    .isString()
    .withMessage("Resume must be a string (file URL)"),

  body("coverLetter")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Cover letter must be at least 10 characters"),
];