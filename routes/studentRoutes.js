import express from 'express'
import { createStudent,getStudents } from '../controllers/studentController.js'

const router =express.Router();

router.post("/create",createStudent);
router.get("/",getStudents);


export default router;
