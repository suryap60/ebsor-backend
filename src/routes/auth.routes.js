import express from "express";
import { register, login, refresh } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/signup", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/refresh", refresh);

export default router;