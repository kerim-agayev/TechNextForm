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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const db_1 = require("../db/db");
// Get all students
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
// Get student by ID
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
// Create a new student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, dob, gender, email, phone, address, school, university, motivation, programmingKnowledge, github, course, } = req.body;
        console.log(`dob:${dob}`);
        //? email
        const existingEmail = yield db_1.db.studentModel.findUnique({
            where: {
                email
            }
        });
        if (existingEmail) {
            return res.status(409).json({ error: "Student with this email already exists", data: null });
        }
        //? phone
        const existingPhone = yield db_1.db.studentModel.findUnique({
            where: {
                phone
            }
        });
        if (existingPhone) {
            return res.status(409).json({ error: "Student with this phone already exists", data: null });
        }
        // Create a new student record
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
                github,
                course,
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
// Update a student ---
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { firstName, lastName, dob, gender, email, phone, address, school, university, motivation, programmingKnowledge, github, course, } = req.body;
        // Check if the student exists
        const existingStudent = yield db_1.db.studentModel.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        // Check if another student has the same email, phone, or GitHub link
        //? email                 String   @unique
        if (email && email !== existingStudent.email) {
            const existingEmail = yield db_1.db.studentModel.findUnique({
                where: { email },
            });
            if (existingEmail) {
                return res.status(404).json({ message: "Email already exists" });
            }
        }
        //? phone                 String   @unique
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
                github: github !== null && github !== void 0 ? github : existingStudent.github,
                lastName: lastName !== null && lastName !== void 0 ? lastName : existingStudent.lastName,
                motivation: motivation !== null && motivation !== void 0 ? motivation : existingStudent.motivation,
                phone: phone !== null && phone !== void 0 ? phone : existingStudent.phone,
                programmingKnowledge: programmingKnowledge !== null && programmingKnowledge !== void 0 ? programmingKnowledge : existingStudent.programmingKnowledge,
                school: school !== null && school !== void 0 ? school : existingStudent.school,
                university: university !== null && university !== void 0 ? university : existingStudent.university
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
// Delete a student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Check if the student exists
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
