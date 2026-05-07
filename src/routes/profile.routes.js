import express from "express";

import auth from "../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/profile.controller.js";


import { validate } from "../middleware/validate.middleware.js";
import { changePasswordValidation, updateProfileValidation } from "../validators/profile.validator.js";

const router = express.Router();

router.get("/", auth, getProfile);

router.put(
  "/update",
  auth,
  updateProfileValidation,
  validate,
  updateProfile
);

router.put(
  "/change-password",
  auth,
  changePasswordValidation,
  validate,
  changePassword
);

export default router;