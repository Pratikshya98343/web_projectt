import express from "express";
import { authController } from "../../controller/auth/authController.js";
import { isAdmin } from "../../middleware/role-middleware.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/admin/login", authController.adminLogin);
router.post("/admin/register", authController.adminSignup);


router.get("/init", authenticateToken, authController.init);

export { router as authRouter };