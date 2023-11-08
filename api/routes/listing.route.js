import express from "express";
const router = express.Router();
import { create } from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyUser";

router.post("/create", verifyToken, create);

export default router;
