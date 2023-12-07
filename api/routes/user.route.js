import express from "express";
import {
  destroy,
  showUserListing,
  test,
  update,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, destroy);
router.get("/listings/:id", verifyToken, showUserListing);
router.get("/:id", verifyToken, getUser);

export default router;
