import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { formSchema } from "@/components/form/TechNextForm";
import { z } from "zod";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
interface StudentData {
  FirstName: string; //?
  LastName: string; //?
  FatherName: string;  //?
  BirthDate: Date;  //?
  FinCode: string;  //? 

  Gender: string;//?
  Email: string;//?
  PhoneNumber: string;  //?
  Address: string;  //?
  University: string; //?

  MotivationLetter: string;  //?
  ProgrammingKnowledge: string; //?
  MajorityId: string;  // 
  FirstStageCompleted?: boolean;  // 
  SecondStageInterviewCompleted?: boolean;  // 

  CourseCompleted?: boolean;  // 
  CreatedAt: Date;
  CvUrl: File;  //?
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

export const loginAdminAsync = createAsyncThunk(
  "students/loginAdminAsync",
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


// Create a new student
export const createStudentAsync = createAsyncThunk(
  "students/createStudentAsync",
  async (studentData: z.infer<typeof formSchema>, { rejectWithValue }) => {
    try {
      //? studentData console
      // for (const key in studentData) {
      //   if (Object.prototype.hasOwnProperty.call(studentData, key)) {
      //     console.log(`student data - ${key}:`, studentData[key]);
      //   }
      // }

      const formData = new FormData();
      formData.append('FirstName', studentData.FirstName);
      formData.append('LastName', studentData.LastName);
      formData.append('FatherName', studentData.FatherName);  // 
      formData.append('BirthDate', new Date(studentData.BirthDate).toISOString()); 
      formData.append('FinCode', studentData.FinCode);  //

      formData.append('Gender', studentData.Gender);
      formData.append('Email', studentData.Email);
      formData.append('PhoneNumber', studentData.PhoneNumber);  // 
      formData.append('Address', studentData.Address);
      formData.append('University', studentData.University);

      formData.append('MotivationLetter', studentData.MotivationLetter);  // 
      formData.append('ProgrammingKnowledge', studentData.ProgrammingKnowledge);
      formData.append('MajorityId', studentData.MajorityId);  // 
      formData.append('CvUrl', studentData.CvUrl);  // 

      //? formData console
      // for (const [key, value] of formData.entries()) {
      //   console.log(`form data ${key}:`, value);
      // }

      // `multipart/form-data` ile API isteği gönderiliyor
      const response = await axios.post(`${apiUrl}/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error || 'An error occurred');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



//? redux get all majorities
export const getAllMajoritiesAsync = createAsyncThunk(
  "students/getAllMajoritiesAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/students/majorities`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.error || 'An error occurred');
    }
  }
);