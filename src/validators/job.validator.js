import { body } from "express-validator";

export const createJobValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

export const updateJobValidation = [
  body("title").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("location").optional().notEmpty(),
];