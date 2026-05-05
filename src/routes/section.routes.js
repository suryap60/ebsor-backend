import express from "express";
import {
  getSections,
  getSectionBySlug,
  updateSection,
  createSection,
  deleteSection,
  getSectionById,
} from "../controllers/section.controller.js";
import isAdmin from "../middleware/admin.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getSections); // list
router.get("/slug/:slug", getSectionBySlug); // single
router.get("/id/:id", getSectionById);

// PROTECTED
router.post("/", auth, isAdmin, createSection);
router.put("/:id", auth, isAdmin, updateSection);
router.delete("/:id", auth, isAdmin, deleteSection);

export default router;