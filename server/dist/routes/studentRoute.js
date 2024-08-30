"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const multer_1 = require("@/middlewares/multer");
const studentRouter = express_1.default.Router();
studentRouter.post("/students", multer_1.upload.single('CvUrl'), studentController_1.createStudent);
studentRouter.get("/students", studentController_1.getStudents);
studentRouter.delete("/students/:id", studentController_1.deleteStudent);
studentRouter.delete("/students", studentController_1.deleteAllStudent);
studentRouter.get("/students/majorities", studentController_1.getAllMajorities);
exports.default = studentRouter;
