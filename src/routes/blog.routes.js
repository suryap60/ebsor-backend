import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// ADMIN
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;