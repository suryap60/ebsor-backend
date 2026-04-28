import { body } from "express-validator";

export const createProductValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

export const updateProductValidation = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
];