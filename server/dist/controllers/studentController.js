"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllStudent = exports.deleteStudent = exports.updateStudentStages = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const cloudinary_1 = require("../utils/cloudinary");
const db_1 = require("../db/db");
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield db_1.db.studentModel.findMany();
        return res.status(200).json({
            data: students,
            error: null
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.getStudents = getStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const student = yield db_1.db.studentModel.findUnique({
            where: { id },
        });
        if (student) {
            return res.status(200).json({
                data: student,
                error: null
            });
        }
        else {
            return res.status(404).json({ error: "Student not found", data: null });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dob, gender, email, phone, address, school, university, motivation, programmingKnowledge, course, } = req.body;
        console.log(`Received data: ${JSON.stringify(req.body)}`);
        if (!req.file) {
            return res.status(400).json({ error: "CV file is required", data: null });
        }
        const { path } = req.file;
        console.log(`path:${path}`);
        const result = yield cloudinary_1.cloudinary.uploader.upload(path);
        if (!result || !result.secure_url) {
            return res.status(500).json({ error: "Failed to upload CV to Cloudinary", data: null });
        }
        const existingEmail = yield db_1.db.studentModel.findUnique({
            where: {
                email
            }
        });
        if (existingEmail) {
            return res.status(409).json({ error: "Student with this email already exists", data: null });
        }
        const existingPhone = yield db_1.db.studentModel.findUnique({
            where: {
                phone
            }
        });
        if (existingPhone) {
            return res.status(409).json({ error: "Student with this phone already exists", data: null });
        }
        const newStudent = yield db_1.db.studentModel.create({
            data: {
                firstName,
                lastName,
                dob,
                gender,
                email,
                phone,
                address,
                school,
                university,
                motivation,
                programmingKnowledge,
                course,
                cv: result.secure_url,
                cloudinary_id: result.public_id
            },
        });
        return res.status(201).json({
            data: newStudent,
            error: null
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { firstStageCompleted, secondStageInterviewCompleted, courseCompleted, firstName, lastName, dob, gender, email, phone, address, school, university, motivation, programmingKnowledge, course, } = req.body;
    if (courseCompleted) {
        console.log(`courseCompleted:${courseCompleted}`);
    }
    if (school) {
        console.log(`school:${school}`);
    }
    try {
        const existingStudent = yield db_1.db.studentModel.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log(`existing student:${existingStudent}`);
        if (email && email !== existingStudent.email) {
            const existingEmail = yield db_1.db.studentModel.findUnique({
                where: { email },
            });
            if (existingEmail) {
                return res.status(404).json({ message: "Email already exists" });
            }
        }
        if (phone && phone !== existingStudent.phone) {
            const existingPhone = yield db_1.db.studentModel.findUnique({
                where: { phone },
            });
            if (existingPhone) {
                return res.status(404).json({ message: "Phone already exists" });
            }
        }
        const updatedStudent = yield db_1.db.studentModel.update({
            where: { id },
            data: {
                address: address !== null && address !== void 0 ? address : existingStudent.address,
                course: course !== null && course !== void 0 ? course : existingStudent.course,
                dob: dob !== null && dob !== void 0 ? dob : existingStudent.dob,
                email: email !== null && email !== void 0 ? email : existingStudent.email,
                firstName: firstName !== null && firstName !== void 0 ? firstName : existingStudent.firstName,
                gender: gender !== null && gender !== void 0 ? gender : existingStudent.gender,
                lastName: lastName !== null && lastName !== void 0 ? lastName : existingStudent.lastName,
                motivation: motivation !== null && motivation !== void 0 ? motivation : existingStudent.motivation,
                phone: phone !== null && phone !== void 0 ? phone : existingStudent.phone,
                programmingKnowledge: programmingKnowledge !== null && programmingKnowledge !== void 0 ? programmingKnowledge : existingStudent.programmingKnowledge,
                school: school !== null && school !== void 0 ? school : existingStudent.school,
                university: university !== null && university !== void 0 ? university : existingStudent.university,
                firstStageCompleted: firstStageCompleted !== null && firstStageCompleted !== void 0 ? firstStageCompleted : existingStudent.firstStageCompleted,
                secondStageInterviewCompleted: secondStageInterviewCompleted !== null && secondStageInterviewCompleted !== void 0 ? secondStageInterviewCompleted : existingStudent.secondStageInterviewCompleted,
                courseCompleted: courseCompleted !== null && courseCompleted !== void 0 ? courseCompleted : existingStudent.courseCompleted
            },
        });
        return res.status(200).json(updatedStudent);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateStudent = updateStudent;
const updateStudentStages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { firstStageCompleted, secondStageInterviewCompleted, courseCompleted, } = req.body;
        const existingStudent = yield db_1.db.studentModel.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        const updatedStudent = yield db_1.db.studentModel.update({
            where: { id },
            data: {
                firstStageCompleted: firstStageCompleted !== null && firstStageCompleted !== void 0 ? firstStageCompleted : existingStudent.firstStageCompleted,
                secondStageInterviewCompleted: secondStageInterviewCompleted !== null && secondStageInterviewCompleted !== void 0 ? secondStageInterviewCompleted : existingStudent.secondStageInterviewCompleted,
                courseCompleted: courseCompleted !== null && courseCompleted !== void 0 ? courseCompleted : existingStudent.courseCompleted,
            },
        });
        return res.status(200).json(updatedStudent);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateStudentStages = updateStudentStages;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const existingStudent = yield db_1.db.studentModel.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return res.status(404).json({ error: "Student not found", data: null });
        }
        yield db_1.db.studentModel.delete({
            where: { id },
        });
        return res.status(200).json({ data: "Student deleted successfully", error: null });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.deleteStudent = deleteStudent;
const deleteAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.studentModel.deleteMany();
        return res.status(200).json({ data: "Student deleted successfully", error: null });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.deleteAllStudent = deleteAllStudent;
