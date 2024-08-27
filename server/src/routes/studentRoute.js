"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const studentRouter = express_1.default.Router();
// GET all students
studentRouter.get("/students", studentController_1.getStudents);
// GET student by ID
studentRouter.get("/students/:id", studentController_1.getStudentById);
// POST create a new student
studentRouter.post("/students", studentController_1.createStudent);
// PUT update a student
studentRouter.put("/students/:id", studentController_1.updateStudent);
// DELETE a student
studentRouter.delete("/students/:id", studentController_1.deleteStudent);
exports.default = studentRouter;
