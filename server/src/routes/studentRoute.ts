import express from "express";
import {
  getStudents,
  createStudent,
  // updateStudent,
  deleteStudent,
  deleteAllStudent,
  getAllMajorities
} from "../controllers/studentController";
import { upload } from "@/middlewares/multer";

const studentRouter = express.Router();
// POST create a new student
studentRouter.post("/students",upload.single('CvUrl') ,  createStudent);
// GET all students
studentRouter.get("/students", getStudents);
// PUT update a student
//studentRouter.put("/students/:id", updateStudent);
// DELETE a student
studentRouter.delete("/students/:id", deleteStudent);
// DELETE all student
studentRouter.delete("/students", deleteAllStudent);


//? get all Majorities
// GET all students
studentRouter.get("/students/majorities", getAllMajorities);
export default studentRouter;
