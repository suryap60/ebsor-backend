import express from "express";

import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import blogRoutes from "./blog.routes.js";
import jobRoutes from "./job.routes.js";
import contactRoutes from "./contact.routes.js";
import applicationRoutes from "./application.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/jobs", jobRoutes);
router.use("/contact", contactRoutes);
router.use("/applications", applicationRoutes);

export default router;