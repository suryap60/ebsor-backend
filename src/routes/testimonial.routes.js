import express from "express";


import { createTestimonialValidation, updateTestimonialValidation } from "../validators/testimonial.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTestimonial, deleteTestimonial, getTestimonialById, getTestimonials, updateTestimonial } from "../controllers/testimonial.controller.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

router.post(
    "/",  
    auth, 
    upload.single("image"), 
    createTestimonialValidation,
    validate, 
    createTestimonial
);

router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateTestimonialValidation,
  validate,
  updateTestimonial
);

router.delete("/:id", auth, deleteTestimonial);

export default router;