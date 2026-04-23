import * as blogService from "../services/blog.service.js";
import { success, created, error } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";

// GET ALL BLOGS
export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await blogService.getAllBlogs({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return success(
      res,
      result.blogs,
      "Blogs fetched successfully",
      result.pagination
    );
  } catch (err) {
    next(err);
  }
};

// GET SINGLE BLOG
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await blogService.getBlogBySlug(slug);

    if (!blog) {
      return error(res, "Blog not found", 404);
    }

    return success(res, blog, "Blog fetched successfully");
  } catch (err) {
    next(err);
  }
};

// CREATE BLOG
export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return error(res, "Title and content are required", 400);
    }

    const slug = slugify(title);

    const existing = await blogService.getBlogBySlug(slug);
    if (existing) {
      return error(res, "Blog already exists", 400);
    }

    const blog = await blogService.createBlog({
      ...req.body,
      slug,
    });

    return created(res, blog, "Blog created successfully");
  } catch (err) {
    next(err);
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await blogService.updateBlog(id, req.body);

    if (!updated) {
      return error(res, "Blog not found", 404);
    }

    return success(res, updated, "Blog updated successfully");
  } catch (err) {
    next(err);
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await blogService.deleteBlog(id);

    if (!deleted) {
      return error(res, "Blog not found", 404);
    }

    return success(res, {}, "Blog deleted successfully");
  } catch (err) {
    next(err);
  }
};