import { body } from "express-validator";

export const createBlogValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("content")
    .notEmpty()
    .withMessage("Content is required"),

  body("excerpt")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Excerpt must be under 200 characters"),

  body("featuredImage")
    .optional().isString(),
    // .isURL()
    // .withMessage("Featured image must be a valid URL"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be draft or published"),
];

export const updateBlogValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty"),

  body("content")
    .optional()
    .notEmpty()
    .withMessage("Content cannot be empty"),

  body("excerpt")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Excerpt must be under 200 characters"),

  body("featuredImage")
    .optional().isString(),
    // .isURL()
    // .withMessage("Featured image must be valid URL"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be draft or published"),
];