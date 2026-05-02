import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactById,
} from "../controllers/contact.controller.js";

import auth from "../middleware/auth.middleware.js";
import { contactValidation } from "../validators/contact.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/", contactValidation, validate, submitContact);

// ADMIN
router.get("/", auth, getContacts);
router.get("/id/:id", auth, getContactById);
router.patch("/:id/status", auth, updateContactStatus);
router.delete("/:id", auth, deleteContact);

export default router;