import express from "express";


import { newContact, getContact } from "../controllers/contactController.js";

const router = express.Router();
router.post("/newContact", newContact);
router.get("/getContact", getContact);

export default router;