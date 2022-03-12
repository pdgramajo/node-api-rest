import { Router } from "express";
import { handleLogin, handleLogout } from "../controllers/authController.js";

const router = Router();

router.route("/login").post(handleLogin);
router.route("/logout").post(handleLogout);

export default router;
