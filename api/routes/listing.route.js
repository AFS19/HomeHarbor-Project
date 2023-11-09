import express from "express";
const router = express.Router();
import { create } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, create);

export default router;
