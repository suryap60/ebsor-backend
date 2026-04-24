import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import auth from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import { productValidation } from "../validators/product.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post("/", auth, isAdmin, productValidation, validate, createProduct);
router.put("/:id", auth, isAdmin, productValidation, validate, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

export default router;