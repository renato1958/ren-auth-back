import express from "express";
import * as authController from "../../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

export default router;