import express from "express";
import { createService, getService } from "../controllers/serviceController.js";

const router = express.Router();

router.post("/create", createService);
router.get("/all", getService);
export default router;

//serviceRoutes.js