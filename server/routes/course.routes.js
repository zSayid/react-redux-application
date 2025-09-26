import express from "express";
// import { protect } from "../middleware/auth.middleware.js";
import { getCourses, getCourseById, createCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById); 
router.post("/", createCourse); // For admin to add new courses

export default router;
