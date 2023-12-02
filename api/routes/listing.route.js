import express from "express";
const router = express.Router();
import {
  create,
  deleteListing,
  updateListing,
  get,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, create);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", get);

export default router;
