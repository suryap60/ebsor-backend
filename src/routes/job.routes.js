import express from "express";
import {
  getJobs,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  toggleJobStatus,
} from "../controllers/job.controller.js";

import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);
router.get("/:slug", getJobBySlug);

// ADMIN
router.post("/", auth, createJob);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);
router.patch("/:id/toggle", auth, toggleJobStatus);

export default router;