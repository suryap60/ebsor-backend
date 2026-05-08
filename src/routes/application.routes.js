import express from "express";
import {
  applyJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import auth from "../middleware/auth.middleware.js";
import { applicationValidation } from "../validators/application.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// USER
// router.post("/", upload.single("resume"), applicationValidation, validate, applyJob);

router.post(
  "/",
  (req, res, next) => {
    console.log("STEP 1 ROUTE");
    next();
  },

  upload.single("resume"),

  (req, res, next) => {
    console.log("STEP 2 AFTER MULTER");
    next();
  },

  applicationValidation,
  validate,

  (req, res, next) => {
    console.log("STEP 3 AFTER VALIDATE");
    next();
  },

  applyJob
);

// ADMIN
router.get("/", auth, getApplications);
router.get("/id/:id", auth, getApplicationById);
router.patch("/:id/status", auth, updateApplicationStatus);

export default router;