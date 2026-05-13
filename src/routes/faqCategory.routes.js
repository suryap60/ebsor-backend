import express from "express";

import {
  getFaqCategories,
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
  getFaqCategoryById,
} from "../controllers/faqCategory.controller.js";

import auth from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getFaqCategories);
router.get("/id/:id", getFaqCategoryById);

router.post("/", auth, isAdmin, createFaqCategory);

router.put("/:id", auth, isAdmin, updateFaqCategory);

router.delete("/:id", auth, isAdmin, deleteFaqCategory);

export default router;