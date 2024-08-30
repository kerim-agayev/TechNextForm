import { cloudinary } from "../utils/cloudinary"
import { db } from "../db/db";
import { Request, RequestHandler, Response } from "express";
import fs from "fs";
// Get all students
export const getStudents: RequestHandler = async (req: Request, res: Response) => {
  try {
    const students = await db.studentModel.findMany();
    return res.status(200).json({
      data:students,
      error:null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "Internal server error" , data:null});
  }
};


// Create a new student
export const createStudent: RequestHandler = async (req: Request, res: Response) => {
  console.log('File:', req.file); //
  console.log('Body:', req.body); 
  try {
    const {
      FirstName,
      LastName,
      FatherName,
      BirthDate,
      FinCode,
      Gender,
      Email,
      PhoneNumber,
      Address,
       University,
      MotivationLetter,
      ProgrammingKnowledge, 
      MajorityId,
    } = req.body;
    if (!Email || !PhoneNumber || !BirthDate) {
      return res.status(400).json({ error: "Email, phone ve birthdate mecburidir", data: null });
    }
  //upload image to cloudinary
  if (!req.file) {
    return res.status(400).json({ error: "CV file is required", data: null });
  }
  const { path } = req.file;
  console.log(`path:${path}`)
  const result = await cloudinary.uploader.upload(path);
  if (!result || !result.secure_url) {
    return res.status(500).json({ error: "Failed to upload CV to Cloudinary", data: null });
  }
    //? email
    const existingEmail = await db.studentModel.findUnique({
      where:{
        Email
      }
    })
    if (existingEmail) {
      return res.status(409).json({ error: "Student with this email already exists", data:null });
    }
    //? phone
    const existingPhone = await db.studentModel.findUnique({
      where:{
        PhoneNumber
      }
    })
    if (existingPhone) {
      return res.status(409).json({ error: "Student with this phone already exists", data:null });
    }
    

    // // Create a new student record
    const newStudent = await db.studentModel.create({
      data: {
      FirstName,
      LastName,
      FatherName,
      BirthDate,
      FinCode,
      Gender,
      Email,
      PhoneNumber,
      Address,
      University,
      MotivationLetter,
      ProgrammingKnowledge, 
      MajorityId,
      CvUrl:result.secure_url,
      cloudinary_id: result.public_id
      },
    });
//? response
    return res.status(201).json({
      data:newStudent,
      error:null,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" , data:null});
  }
};
// Update a student ---
// export const updateStudent: RequestHandler = async (req, res) => {
//   const id = req.params.id;
//   const { 
//     firstStageCompleted,
//     secondStageInterviewCompleted,
//     courseCompleted,
//       firstName,
//       lastName,
//       dob,
//       gender,
//       email ,
//       phone,
//       address,
//       school,
//       university ,
//       motivation,
//        programmingKnowledge,
     
//       course,
//     } = req.body;
//     if (courseCompleted) {
//       console.log(`courseCompleted:${courseCompleted}`)
//     }
// if (school) {
//   console.log(`school:${school}`)
// }
//   try {
  
      
//     // Check if the student exists
//     const existingStudent = await db.studentModel.findUnique({
//       where: { id },
//     });

//     if (!existingStudent) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     console.log(`existing student:${existingStudent}`)
//     // Check if another student has the same email, phone,
//     //? email                 String   @unique
//     if (email && email !== existingStudent.email) {
//         const existingEmail = await db.studentModel.findUnique({
//             where: { email },
//           });
      
//           if (existingEmail) {
//             return res.status(404).json({ message: "Email already exists" });
//           }
//     }
//     //? phone                 String   @unique
//     if (phone && phone !== existingStudent.phone) {
//         const existingPhone = await db.studentModel.findUnique({
//             where: { phone },
//           });
      
//           if (existingPhone) {
//             return res.status(404).json({ message: "Phone already exists" });
//           }
//     }

//     const updatedStudent = await db.studentModel.update({
//       where: { id },
//       data: {
//         address:  address ?? existingStudent.address  ,
//         course:  course  ?? existingStudent.course ,
//         dob:   dob  ?? existingStudent.dob,
//         email:   email  ?? existingStudent.email,
//         firstName:  firstName  ?? existingStudent.firstName ,
//         gender: gender  ?? existingStudent.gender  ,
      
//         lastName:  lastName   ?? existingStudent.lastName,
//         motivation:   motivation  ?? existingStudent.motivation,
//         phone:  phone  ?? existingStudent.phone ,
//         programmingKnowledge:  programmingKnowledge   ?? existingStudent.programmingKnowledge,
//         school:  school   ?? existingStudent.school,
//         university:  university ?? existingStudent.university,
//         firstStageCompleted:firstStageCompleted ?? existingStudent.firstStageCompleted,
//         secondStageInterviewCompleted:secondStageInterviewCompleted ?? existingStudent.secondStageInterviewCompleted,
//         courseCompleted:courseCompleted ?? existingStudent.courseCompleted

//       },
//     });

//     return res.status(200).json(updatedStudent);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// Delete a student
export const deleteStudent: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Check if the student exists
    const existingStudent = await db.studentModel.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found", data:null });
    }

    await db.studentModel.delete({
      where: { id },
    });

    return res.status(200).json({ data: "Student deleted successfully" , error:null});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" , data:null});
  }
};

//? delete all
export const deleteAllStudent: RequestHandler = async (req: Request, res: Response) => {
  try {
   

    // Check if the student exists
  
    await db.studentModel.deleteMany()

    return res.status(200).json({ data: "Student deleted successfully" , error:null});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" , data:null});
  }
};


//?
// Get all Majorities
export const getAllMajorities: RequestHandler = async (req: Request, res: Response) => {
  try {
    const majority = await db.majority.findMany();
    return res.status(200).json({
      data:majority,
      error:null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "Internal server error" , data:null});
  }
};