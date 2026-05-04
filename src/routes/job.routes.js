import express from "express";
import {
  getJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
  getJobById,
} from "../controllers/job.controller.js";

import auth from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import isAdmin from "../middleware/admin.middleware.js";
import { createJobValidation, updateJobValidation } from "../validators/job.validator.js";
import authOptional from "../middleware/authOptional.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", authOptional, getJobs);
router.get("/slug/:slug", getJobBySlug);
router.get("/id/:id", getJobById);

// ADMIN
// router.get("/admin", auth, isAdmin, getJobs);
router.post("/", auth, createJobValidation, validate, isAdmin, createJob);
router.put("/:id", auth, updateJobValidation, validate, isAdmin, updateJob);
router.delete("/:id", auth, deleteJob);
router.patch("/:id/toggle", auth, toggleJobStatus);

export default router;