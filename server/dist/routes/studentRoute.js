"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const multer_1 = require("../middlewares/multer");
const studentRouter = express_1.default.Router();
studentRouter.get("/students", studentController_1.getStudents);
studentRouter.get("/students/:id", studentController_1.getStudentById);
studentRouter.post("/students", multer_1.upload.single("cvfile"), studentController_1.createStudent);
studentRouter.put("/students/:id", studentController_1.updateStudent);
studentRouter.delete("/students/:id", studentController_1.deleteStudent);
studentRouter.delete("/students", studentController_1.deleteAllStudent);
exports.default = studentRouter;
