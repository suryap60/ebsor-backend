import express from "express";

import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

import upload from "../middleware/upload.middleware.js";

import auth from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";

const router = express.Router();


// PUBLIC
router.get("/", getBrands);
router.get("/id/:id", getBrandById);


// ADMIN
router.post(
  "/",
  auth,
  isAdmin,
  upload.single("logo"),
  createBrand
);

router.put(
  "/:id",
  auth,
  isAdmin,
  upload.single("logo"),
  updateBrand
);

router.delete(
  "/:id",
  auth,
  isAdmin,
  deleteBrand
);

export default router;