import { body } from "express-validator";

export const productValidation = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),
];