import express from "express";

import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import blogRoutes from "./blog.routes.js";
import jobRoutes from "./job.routes.js";
import contactRoutes from "./contact.routes.js";
import applicationRoutes from "./application.routes.js";
import testimonialRoutes from "./testimonial.routes.js";
import sectionsRoutes from "./section.routes.js";
import profileRoutes from "./profile.routes.js";
import brandRoutes from "./brand.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/jobs", jobRoutes);
router.use("/contact", contactRoutes);
router.use("/applications", applicationRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/sections", sectionsRoutes);
router.use("/profile", profileRoutes);
router.use("/brands", brandRoutes);



export default router;