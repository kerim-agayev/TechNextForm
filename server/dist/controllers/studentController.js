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
exports.getAllMajorities = exports.deleteAllStudent = exports.deleteStudent = exports.createStudent = exports.getStudents = void 0;
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
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('File:', req.file);
    console.log('Body:', req.body);
    try {
        const { FirstName, LastName, FatherName, BirthDate, FinCode, Gender, Email, Phone, Address, University, MotivationLetter, ProgrammingKnowledge, MajorityId, } = req.body;
        if (!Email || !Phone || !BirthDate) {
            return res.status(400).json({ error: "Email, phone ve birthdate mecburidir", data: null });
        }
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
                Email
            }
        });
        if (existingEmail) {
            return res.status(409).json({ error: "Student with this email already exists", data: null });
        }
        const existingPhone = yield db_1.db.studentModel.findUnique({
            where: {
                Phone
            }
        });
        if (existingPhone) {
            return res.status(409).json({ error: "Student with this phone already exists", data: null });
        }
        const newStudent = yield db_1.db.studentModel.create({
            data: {
                FirstName,
                LastName,
                FatherName,
                BirthDate,
                FinCode,
                Gender,
                Email,
                Phone,
                Address,
                University,
                MotivationLetter,
                ProgrammingKnowledge,
                MajorityId,
                CvUrl: result.secure_url,
                cloudinary_id: result.public_id
            },
        });
        return res.status(201).json({
            data: newStudent,
            error: null,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.createStudent = createStudent;
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
const getAllMajorities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const majority = yield db_1.db.majority.findMany();
        return res.status(200).json({
            data: majority,
            error: null
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", data: null });
    }
});
exports.getAllMajorities = getAllMajorities;
