import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudentsAsync,
  getStudentByIdAsync,
  createStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
  getAllMajoritiesAsync,
  
} from "./StudentService";

export interface Student {
    id: string;

    FirstName: string;
    LastName: string;
    FatherName: string;
    BirthDate: Date;
    Gender: string;

    Email: string;
    PhoneNumber: string;  // 
    Address: string;
    University: string;
    MotivationLetter: string;  //

    ProgrammingKnowledge: string;
    MajorityId: string;  // 
    FirstStageCompleted?: boolean;  // Optional field to match the Prisma model
    SecondStageInterviewCompleted?: boolean;  // Optional field to match the Prisma model
    CourseCompleted?: boolean;  // Optional field to match the Prisma model
    CreatedAt: Date; 
    CvUrl: File; // CV file
  }
  interface Majority {
    id: string;
    MajorityName: string;
  }
 
  interface StudentState {
    //? student
    students: Student[];
    student: Student | null;
    //? loading
    isLoading: boolean;
    isLoadingDelete: boolean;
   

    //? errors
    error: string | null  ;
    errorDelete: string | null  ;
    //? majority
    majorities: Majority[]; 

    isMajoritiesLoading: boolean;
    isMajoritiesError: string | null  ;
  
  
  }
  
  const initialState: StudentState = {
    students: [],
    student: null,
    isLoading: false,
    isLoadingDelete: false,
    error: null,
    errorDelete: null,
    majorities: [], //? +
    isMajoritiesLoading:false, //?+
    isMajoritiesError:null, //? +
  };
  
const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //   //? get all
  //     .addCase(getAllStudentsAsync.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getAllStudentsAsync.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.students = action.payload;
  //     })
  //     .addCase(getAllStudentsAsync.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     })
  //     //? get by id
  //     .addCase(getStudentByIdAsync.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getStudentByIdAsync.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.student = action.payload;
  //     })
  //     .addCase(getStudentByIdAsync.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     })
  //     //? create
  //     .addCase(createStudentAsync.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(createStudentAsync.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.students.push(action.payload);
  //     })
  //     .addCase(createStudentAsync.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     })
  //     //? update
  //     .addCase(updateStudentAsync.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(updateStudentAsync.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       const index = state.students.findIndex((student) => student.id === action.payload.id);
  //       if (index !== -1) {
  //         state.students[index] = action.payload;
  //       }
  //     })
  //     .addCase(updateStudentAsync.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload as string;
  //     })
  //     //? delete
  //     .addCase(deleteStudentAsync.pending, (state) => {
  //       state.isLoadingDelete = true;
  //     })
  //     .addCase(deleteStudentAsync.fulfilled, (state, action) => {
  //       state.isLoadingDelete = false;
  //       state.students = state.students.filter((student) => student.id !== action.payload);
  //     })
  //     .addCase(deleteStudentAsync.rejected, (state, action) => {
  //       state.isLoadingDelete = false;
  //       state.errorDelete = action.payload as string;
  //     })
  //     //? majorities
  //     .addCase(getAllMajoritiesAsync.pending, (state) => {
  //       state.isMajoritiesLoading = true;
  //     })
  //     .addCase(getAllMajoritiesAsync.fulfilled, (state, action) => {
  //       state.isMajoritiesLoading = false;
  //       state.majorities = action.payload;
  //     })
  //     .addCase(getAllMajoritiesAsync.rejected, (state, action) => {
  //       state.isMajoritiesLoading = false;
  //       state.isMajoritiesError = action.payload as string;
  //     });
    
  // },
  extraReducers: (builder) => {
    builder
      // get all students
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
      // get by id
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
      // create
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
      // update
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
      // delete
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
      // majorities
      .addCase(getAllMajoritiesAsync.pending, (state) => {
        state.isMajoritiesLoading = true;
      })
      .addCase(getAllMajoritiesAsync.fulfilled, (state, action) => {
        state.isMajoritiesLoading = false;
        state.majorities = action.payload;
      })
      .addCase(getAllMajoritiesAsync.rejected, (state, action) => {
        state.isMajoritiesLoading = false;
        state.isMajoritiesError = action.payload as string;
      });
  }
  
});

export default studentSlice.reducer;
