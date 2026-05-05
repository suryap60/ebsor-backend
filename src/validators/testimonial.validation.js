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
    .withMessage("Description is required"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

export const updateTestimonialValidation = [
  body("name").optional().notEmpty(),
  body("designation").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("rating").optional().isInt({ min: 1, max: 5 }),
];