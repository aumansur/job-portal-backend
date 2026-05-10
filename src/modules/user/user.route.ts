// src/modules/user/user.route.ts

import express from "express";
import { getUsers, toggleUserStatus } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// 🔥 ONLY ADMIN
router.get("/", auth("admin"), getUsers);
router.patch("/:id/toggle", auth("admin"), toggleUserStatus);

export default router;
