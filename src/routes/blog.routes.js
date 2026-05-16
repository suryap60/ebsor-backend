import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controllers/blog.controller.js";
import upload from "../middleware/upload.middleware.js";

import auth from "../middleware/auth.middleware.js";
import { createBlogValidation, updateBlogValidation } from "../validators/blog.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import authOptional from "../middleware/authOptional.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", authOptional, getBlogs);
router.get("/slug/:slug", authOptional, getBlogBySlug);
router.get("/id/:id", getBlogById);

// ADMIN
router.post("/", auth, isAdmin, upload.single("featuredImage"), createBlogValidation, validate, createBlog);
router.put("/:id", auth, isAdmin, upload.single("featuredImage"), updateBlogValidation, validate, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;