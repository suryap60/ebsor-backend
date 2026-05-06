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
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/slug/:slug", getProductBySlug);
router.get("/id/:id", getProductById);

router.post("/", auth, isAdmin, upload.array("images",5), createProductValidation, validate, createProduct);
router.put("/:id", auth, isAdmin, upload.array("images"), updateProductValidation, validate, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

export default router;