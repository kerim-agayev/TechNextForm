"use client";
import React, { useEffect, useState } from "react";
import { Table, Space, Button, message, Spin, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { deleteStudentAsync, getAllStudentsAsync } from "../../../redux/slice/StudentService";
import type { Student } from "../../../redux/slice/StudentSlice";
import { courses, genders, universities } from "@/components/form/TechNextForm";
import type { ColumnsType, TableProps } from "antd/es/table";

const StudentDashboard: React.FC = () => {
  //? students filter
  
  //? redux toolkit
  const dispatch = useAppDispatch();
  const { students, isLoading, error, errorDelete, isLoadingDelete } = useAppSelector((state) => state.students);
  //console.log(`students:${JSON.stringify(students)}`)
  //? use effect
  useEffect(() => {
    const getAll = async () => {
      await dispatch(getAllStudentsAsync());
    }
    getAll();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);
  //? calculate age
  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
//? students table

  const columns: ColumnsType<Student> = [
    {
      title: "No",
      key: "index",
      render: (_, __, index) => index + 1,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (dob: Date) => {
        const age = calculateAge(dob);
        return (
          <span style={{ color: age < 16 ? 'red' : 'black' }}>
            {new Date(dob).toLocaleDateString()}
          </span>
        );
      },
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      sorter: (a: Student, b: Student) => new Date(a.dob).getTime() - new Date(b.dob).getTime(),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: genders.map((gender) => ({
        text: gender,
        value: gender,
      })),
      onFilter: (value, record) => record.gender === value,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
        title: "School",
        dataIndex: "school",
        key: "school",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "University",
        dataIndex: "university",
        key: "university",
        filters: universities.map((university) => ({
          text: university,
          value: university,
        })),
        onFilter: (value, record) => record.university === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
        filters: courses.map((course) => ({
          text: course,
          value: course,
        })),
        onFilter: (value, record) => record.course === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Github",
        dataIndex: "github",
        key: "github",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "First Stage Completed",
        dataIndex: "firstStageCompleted",
        key: "firstStageCompleted",
        render: (completed: boolean) => completed ? "✔️" : "❌",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Second Stage Interview Completed",
        dataIndex: "secondStageInterviewCompleted",
        key: "secondStageInterviewCompleted",
        render: (completed: boolean) => completed ? "✔️" : "❌",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Course Completed",
        dataIndex: "courseCompleted",
        key: "courseCompleted",
        render: (completed: boolean) => completed ? "✔️" : "❌",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure you want to delete this student?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="link"
                danger
                disabled={isLoadingDelete} // Disable button if deleting
              >
                {isLoadingDelete ? <Spin /> : "Delete"}
              </Button>
            </Popconfirm>
          </Space>
        ),
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
  ];
  //? handle delete
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteStudentAsync(id)).unwrap();
      message.success("Student deleted successfully");
    } catch (err: any) {
      message.error(err.message || "Failed to delete student");
    }
  };
  //? selected keys
  // Row selection logic
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableProps<Student>['rowSelection'] = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div className="mx-6">
      <h1 className="flex justify-center items-center mx-4 text-2xl font-semibold text-cyan-600 p-4 rounded-md">Student Dashboard</h1>
      <Table 
        columns={columns} 
        dataSource={Array.isArray(students) ? students : []} 
        loading={isLoading} 
        rowKey="id" 
        scroll={{ x: 'max-content' }}
        rowSelection={rowSelection}
      
   
      />
    </div>
  );
};

export default StudentDashboard;


//? yasa gore sorting
//? yasa gore filter
//? ada gore filter
//? soyada gore filter
//? kursa gore filter
//? cinse gore filter
//? universitete gore filter