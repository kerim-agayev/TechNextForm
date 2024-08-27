"use client";
import React, { useEffect } from "react";
import { Table, Space, Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { getAllStudentsAsync } from "../../../redux/slice/StudentService";
import type { ColumnsType } from "antd/es/table";
import type { Student } from "../../../redux/slice/StudentSlice";

const StudentDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, isLoading, error } = useAppSelector((state) => state.students);
  
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

  const columns: ColumnsType<Student> = [
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
      render: (dob: Date) => new Date(dob).toLocaleDateString(),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Github",
        dataIndex: "github",
        key: "github",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      {
        title: "Course",
        dataIndex: "course",
        key: "course",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="link">Edit</Button>
    //       <Button type="link" danger>
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    //   responsive: ['md'],
    // },
  ];

  return (
    <div>
      <h1 className="flex justify-center items-center mx-4 text-2xl font-semibold text-cyan-600 p-4 rounded-md">Student Dashboard</h1>
      <Table 
        columns={columns} 
        dataSource={Array.isArray(students) ? students : []} 
        loading={isLoading} 
        rowKey="id" 
        scroll={{ x: 'max-content' }}
   
      />
    </div>
  );
};

export default StudentDashboard;
