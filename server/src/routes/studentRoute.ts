import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const studentRouter = express.Router();

// GET all students
studentRouter.get("/students", getStudents);

// GET student by ID
studentRouter.get("/students/:id", getStudentById);

// POST create a new student
studentRouter.post("/students", createStudent);

// PUT update a student
studentRouter.put("/students/:id", updateStudent);

// DELETE a student
studentRouter.delete("/students/:id", deleteStudent);

export default studentRouter;
