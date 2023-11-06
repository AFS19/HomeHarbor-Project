import express from "express";
import { destroy, test, update } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, destroy);

export default router;
