import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudent
} from "../controllers/studentController";
import { upload } from "@/middlewares/multer";

const studentRouter = express.Router();

// GET all students
studentRouter.get("/students", getStudents);

// GET student by ID
studentRouter.get("/students/:id", getStudentById);

// POST create a new student
studentRouter.post("/students",upload.single('image') ,  createStudent);

// PUT update a student
studentRouter.put("/students/:id", updateStudent);
// DELETE a student
studentRouter.delete("/students/:id", deleteStudent);
// DELETE all student
studentRouter.delete("/students", deleteAllStudent);

export default studentRouter;
