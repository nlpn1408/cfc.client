import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

export default router;
