import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactById,
} from "../controllers/contact.controller.js";

import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// PUBLIC
router.post("/", submitContact);

// ADMIN
router.get("/", auth, getContacts);
router.get("/:id", auth, getContactById);
router.patch("/:id/status", auth, updateContactStatus);
router.delete("/:id", auth, deleteContact);

export default router;