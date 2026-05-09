import { body } from "express-validator";

export const contactValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("phone")
    .optional({ values: "falsy" })
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("name")
    .optional({ values: "falsy" }),

  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters"),
];