import { db } from "@/db/db";
import { RequestHandler } from "express";

// Get all students
export const getStudents: RequestHandler = async (req, res) => {
  try {
    const students = await db.studentModel.findMany();
    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get student by ID
export const getStudentById: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await db.studentModel.findUnique({
      where: { id },
    });
    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new student
export const createStudent: RequestHandler = async (req, res) => {
  try {
    const { email, phone, github } = req.body;

    // Check if a student with the same email or phone already exists
    const existingStudent = await db.studentModel.findFirst({
      where: {
        OR: [
          { email },
          { phone },
          { github },
        ],
      },
    });

    if (existingStudent) {
      return res.status(409).json({ message: "Student with this email, phone, or GitHub link already exists" });
    }

    const newStudent = await db.studentModel.create({
      data: req.body,
    });

    return res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a student
export const updateStudent: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { 
        firstName,
        lastName,
        dob,
        gender,
        email ,
        phone,
        address,
        school,
        university ,
        motivation,
         programmingKnowledge,
        github,
        course,  } = req.body;

    // Check if the student exists
    const existingStudent = await db.studentModel.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if another student has the same email, phone, or GitHub link
    //? email                 String   @unique
    if (email && email !== existingStudent.email) {
        const existingEmail = await db.studentModel.findUnique({
            where: { email },
          });
      
          if (existingEmail) {
            return res.status(404).json({ message: "Email already exists" });
          }
    }
    //? phone                 String   @unique
    if (phone && phone !== existingStudent.phone) {
        const existingPhone = await db.studentModel.findUnique({
            where: { phone },
          });
      
          if (existingPhone) {
            return res.status(404).json({ message: "Phone already exists" });
          }
    }

    const updatedStudent = await db.studentModel.update({
      where: { id },
      data: {
        address:  address ?? existingStudent.address  ,
        course:  course  ?? existingStudent.course ,
        dob:   dob  ?? existingStudent.dob,
        email:   email  ?? existingStudent.email,
        firstName:  firstName  ?? existingStudent.firstName ,
        gender: gender  ?? existingStudent.gender  ,
        github:  github  ?? existingStudent.github ,
        lastName:  lastName   ?? existingStudent.lastName,
        motivation:   motivation  ?? existingStudent.motivation,
        phone:  phone  ?? existingStudent.phone ,
        programmingKnowledge:  programmingKnowledge   ?? existingStudent.programmingKnowledge,
        school:  school   ?? existingStudent.school,
        university:  university ?? existingStudent.university  
      },
    });

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a student
export const deleteStudent: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the student exists
    const existingStudent = await db.studentModel.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await db.studentModel.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
