import express from "express";


import { createTestimonialValidation, updateTestimonialValidation } from "../validators/testimonial.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTestimonial, deleteTestimonial, getTestimonialById, getTestimonials, updateTestimonial } from "../controllers/testimonial.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

router.post("/", createTestimonialValidation, auth, validate, createTestimonial);

router.put("/:id", updateTestimonialValidation, auth, validate, updateTestimonial);

router.delete("/:id", auth, deleteTestimonial);

export default router;