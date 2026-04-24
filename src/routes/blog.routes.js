import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import auth from "../middleware/auth.middleware.js";
import { blogValidation } from "../validators/blog.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// ADMIN
router.post("/", auth, blogValidation, validate, createBlog);
router.put("/:id", auth, blogValidation, validate, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;