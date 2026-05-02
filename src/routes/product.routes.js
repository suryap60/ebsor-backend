import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js";

import auth from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import { createProductValidation, updateProductValidation } from "../validators/product.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/id/:id", getProductById);

router.post("/", auth, isAdmin, createProductValidation, validate, createProduct);
router.put("/:id", auth, isAdmin, updateProductValidation, validate, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

export default router;