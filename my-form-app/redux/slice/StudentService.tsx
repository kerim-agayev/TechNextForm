import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Student } from "./StudentSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
interface StudentData {
    firstName: string;
    lastName: string; 
    dob: Date;
    gender: string;
    email: string;
    phone: string;
    address: string;
    school: string;
    university: string;
    motivation: string;
    programmingKnowledge: string;
    course: string;
    firstStageCompleted?: boolean;  // Optional field
    secondStageInterviewCompleted?: boolean;  // Optional field
    courseCompleted?: boolean;  // Optional field
    createdAt: Date; 
    cv: File; // CV file
  }
  
// Get all students
export const getAllStudentsAsync = createAsyncThunk(
  "students/getAllStudentsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/students`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.error || 'An error occurred');
    }
  }
);

// Get a student by ID
export const getStudentByIdAsync = createAsyncThunk(
  "students/getStudentByIdAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/students/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.error || 'An error occurred');
    }
  }
);

// Create a new student

// export const createStudentAsync = createAsyncThunk(
//     "students/createStudentAsync",
//     async (studentData: StudentData, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(`${apiUrl}/students`, studentData);
//         return response.data;
//       } catch (error: any) {
//         if (error.response && error.response.data) {
//           return rejectWithValue(error.response?.data.error || 'An error occurred');
//         } else {
//           return rejectWithValue(error.message);
//         }
//       }
//     }
//   );
// Create a new student
// export const createStudentAsync = createAsyncThunk(
//   "students/createStudentAsync",
//   async (studentData: FormData, { rejectWithValue }) => {
//     try {
//       // `multipart/form-data` 
//       const response = await axios.post(`${apiUrl}/students`, studentData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', //
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response?.data.error || 'An error occurred');
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );



// Update a student
export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, ...studentData }: { id: string; [key: string]: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/students/${id}`, studentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.error || 'An error occurred');
    }
  }
);


// Delete a student
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/students/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.error || 'An error occurred');
    }
  }
);


//? login service 
// Create a new student
export const loginAdminAsync = createAsyncThunk(
  "students/createStudentAsync",
  async (loginData: StudentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginData);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response?.data.error || 'An error occurred');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const createStudentAsync = createAsyncThunk(
  "students/createStudentAsync",
  async (studentData: StudentData,{ rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('firstName', studentData.firstName);
      formData.append('lastName', studentData.lastName);
      formData.append('dob', studentData.dob.toISOString());
      formData.append('gender', studentData.gender);
      formData.append('email', studentData.email);
      formData.append('phone', studentData.phone);
      formData.append('address', studentData.address);
      formData.append('school', studentData.school);
      formData.append('university', studentData.university);
      formData.append('motivation', studentData.motivation);
      formData.append('programmingKnowledge', studentData.programmingKnowledge);
      formData.append('course', studentData.course);
      formData.append('cv', studentData.cv);
      
      // `multipart/form-data` 
      const response = await axios.post(`${apiUrl}/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', //
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response?.data.error || 'An error occurred');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


 