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

const router = express.Router();

// USER
router.post("/", applicationValidation, validate, applyJob);

// ADMIN
router.get("/", auth, getApplications);
router.get("/id/:id", auth, getApplicationById);
router.patch("/:id/status", auth, updateApplicationStatus);

export default router;