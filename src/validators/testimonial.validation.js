import { body } from "express-validator";

export const createTestimonialValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("designation")
    .notEmpty()
    .withMessage("Designation is required"),

  body("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("image")
    .optional().isString(),
];

export const updateTestimonialValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("designation")
    .notEmpty()
    .withMessage("Designation is required"),

  body("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("image").optional(),
];