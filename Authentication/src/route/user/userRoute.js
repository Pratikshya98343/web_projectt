import express from "express";
import { userController } from "../../controller/index.js";
import { isAdmin } from "../../middleware/role-middleware.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

// Admin only routes
router.get("/", authenticateToken, isAdmin, userController.getAll);
router.post("/", authenticateToken, isAdmin, userController.create);
router.put("/:id", authenticateToken, isAdmin, userController.update);
router.delete("/:id", authenticateToken, isAdmin, userController.delelteById);

// Both admin and user can access
router.get("/:id", authenticateToken, userController.getById);

export { router as userRouter };