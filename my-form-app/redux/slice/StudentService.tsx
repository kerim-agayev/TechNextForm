import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    github?: string | null; 
    course: string;
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
export const createStudentAsync = createAsyncThunk(
    "students/createStudentAsync",
    async (studentData: StudentData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${apiUrl}/students`, studentData);
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
