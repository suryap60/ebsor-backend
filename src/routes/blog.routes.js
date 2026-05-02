import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blog.controller.js";

import auth from "../middleware/auth.middleware.js";
import { createBlogValidation, updateBlogValidation } from "../validators/blog.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/id/:id", getBlogById);

// ADMIN
router.post("/", auth, isAdmin, createBlogValidation, validate, createBlog);
router.put("/:id", auth, isAdmin, updateBlogValidation, validate, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;