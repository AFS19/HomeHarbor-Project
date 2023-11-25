import express from "express";
const router = express.Router();
import { create, deleteListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, create);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
