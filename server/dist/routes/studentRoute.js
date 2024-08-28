import express from "express";
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, } from "../controllers/studentController";
const studentRouter = express.Router();
studentRouter.get("/students", getStudents);
studentRouter.get("/students/:id", getStudentById);
studentRouter.post("/students", createStudent);
studentRouter.put("/students/:id", updateStudent);
studentRouter.delete("/students/:id", deleteStudent);
export default studentRouter;
