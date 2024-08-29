import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudentsAsync,
  getStudentByIdAsync,
  createStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
  
} from "./StudentService";

export interface Student {
    id: string;
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
    firstStageCompleted?: boolean;  // Optional field to match the Prisma model
    secondStageInterviewCompleted?: boolean;  // Optional field to match the Prisma model
    courseCompleted?: boolean;  // Optional field to match the Prisma model
    createdAt: Date; 
    cv: File; // CV file
  }
 
  interface StudentState {
    students: Student[];
    student: Student | null;
    //? loading
    isLoading: boolean;
    isLoadingDelete: boolean;
   

    //? errors
    error: string | null  ;
    errorDelete: string | null  ;
  
  }
  
  const initialState: StudentState = {
    students: [],
    student: null,
    isLoading: false,
    isLoadingDelete: false,
    error: null,
    errorDelete: null,
   
  };
  
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //? get all
      .addCase(getAllStudentsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudentsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //? get by id
      .addCase(getStudentByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
      })
      .addCase(getStudentByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //? create
      .addCase(createStudentAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //? update
      .addCase(updateStudentAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.students.findIndex((student) => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //? delete
      .addCase(deleteStudentAsync.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.isLoadingDelete = false;
        state.students = state.students.filter((student) => student.id !== action.payload);
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.isLoadingDelete = false;
        state.errorDelete = action.payload as string;
      })
    
  },
});

export default studentSlice.reducer;
