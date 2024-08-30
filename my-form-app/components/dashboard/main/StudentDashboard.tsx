"use client";
import React, { useEffect, useState } from "react";
import { Table, Space, Button, message, Spin, Popconfirm, Input, Form, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { deleteStudentAsync, getAllMajoritiesAsync, getAllStudentsAsync, updateStudentAsync } from "../../../redux/slice/StudentService";
import type { Student } from "../../../redux/slice/StudentSlice";
import { courses, genders, universities } from "@/components/form/TechNextForm";
import type { ColumnsType, TableProps } from "antd/es/table";
import { SearchIcon } from "lucide-react";

const StudentDashboard: React.FC = () => {
  //? redux toolkit
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Dispatch the action to fetch majorities
    dispatch(getAllMajoritiesAsync())
      .unwrap() // unwrap to handle errors
      .catch((error) => {

        message.error(`Error fetching majorities: ${error}`);

      });
  }, [dispatch]);
 

  const [editingRow, seteditingRow] = useState<Student>()
  const { students, isLoading, error, errorDelete, isLoadingDelete, majorities } = useAppSelector((state) => state.students);
  const majorityMap = majorities.reduce((acc, majority) => {
    acc[majority.id] = majority.MajorityName;
    return acc;
  }, {} as { [key: string]: string });
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
  //? booelan filters
  const booleanFilters = [
    { text: '✔️ True', value: 'true' },
    { text: '❌ False', value: 'false' },
  ];

  const booleanFiltersTwo = [
    { text: '✔️ True', value: 'true' },
    { text: '❌ False', value: 'false' },
  ];
  const booleanFiltersThree = [
    { text: '✔️ True', value: 'true' },
    { text: '❌ False', value: 'false' },
  ];

//? students table

  const columns: ColumnsType<Student> = [
    //? index
    {
      title: "No",
      key: "index",
      render: (_, __, index) => index + 1,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
     //? firstname
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "firstName",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
         <>
          <Input
            autoFocus
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []); // 
            }}
            onPressEnter={() => confirm()}
            value={selectedKeys[0] || ""}
            onBlur={() => confirm()}
          />
          <Button type="primary" onClick={()=> confirm()}>
            Search
          </Button>
        
          </>
        );
      },
      filterIcon:() => {
        return <SearchIcon size={10}/>
      },
      onFilter:(value, record) => {
        return record.FirstName.toLowerCase().includes(value.toString().toLowerCase())
      }
    },
     //? lastname
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "lastName",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
      //? FatherName
      {
        title: "Last Name",
        dataIndex: "FatherName",
        key: "FatherName",
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
    //? birthdate
    {
      title: "Birthdate",
      dataIndex: "BirthDate",
      key: "BirthDate",
      render: (dob: Date) => {
        const age = calculateAge(dob);
        return (
          <span style={{ color: age < 16 ? 'red' : 'black' }}>
            {new Date(dob).toLocaleDateString()}
          </span>
        );
      },
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      sorter: (a: Student, b: Student) => new Date(a.BirthDate).getTime() - new Date(b.BirthDate).getTime(),
    },
    //? gender
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
      filters: genders.map((gender) => ({
        text: gender,
        value: gender,
      })),
      onFilter: (value, record) => record.Gender === value,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    //? email
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
        <>
        
        <Input
            autoFocus
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []); // 
            }}
            onPressEnter={() => confirm()}
            value={selectedKeys[0] || ""}
            onBlur={() => confirm()}
          />
          <Button type="primary" onClick={()=> confirm()}>
          Search
        </Button>
        </>
        );
      },
      filterIcon: () => {
        return <SearchIcon size={10} />;
      },
      onFilter: (value, record) => {
        return record.Email.toLowerCase().includes(value.toString().toLowerCase());
      }
    },
    //? phone
    {
      title: "Phone",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
          <Input
            autoFocus
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []); // 
            }}
            onPressEnter={() => confirm()}
            value={selectedKeys[0] || ""}
            onBlur={() => confirm()}
          />
          <Input
          autoFocus
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []); // 
          }}
          onPressEnter={() => confirm()}
          value={selectedKeys[0] || ""}
          onBlur={() => confirm()}
        />
        <Button type="primary" onClick={()=> confirm()}>
        Search
      </Button></>
        );
      },
      filterIcon: () => {
        return <SearchIcon size={10} />;
      },
      onFilter: (value, record) => {
        return record.PhoneNumber.toLowerCase().includes(value.toString().toLowerCase());
      }
    },
    //? school
      //? university
      {
        title: "University",
        dataIndex: "University",
        key: "University",
        filters: universities.map((university) => ({
          text: university,
          value: university,
        })),
        onFilter: (value, record) => record.University === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      //? course
      {
        title: "Majority",
        dataIndex: "MajorityId",
        key: "MajorityId",
        render: (majorityId: string) => majorityMap[majorityId] || 'Unknown',
        filters: courses.map((course) => ({
          text: course,
          value: course,
        })),
        onFilter: (value, record) => majorityMap[record.MajorityId] === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      //? first stage
      {
        title: "First Stage Completed",
        dataIndex: "FirstStageCompleted",
        key: "FirstStageCompleted",
        render: (completed: boolean, record) => {
          if (editingRow && editingRow.id === record.id) {
            return (
              <Form.Item name="FirstStageCompleted" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            );
          } else {
            return completed ? "✔️" : "❌";
          }
        },
        filters: booleanFilters,
        onFilter: (value, record) => record.FirstStageCompleted?.toString() === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      //? second stage
      {
    title: "Second Stage Interview Completed",
    dataIndex: "SecondStageInterviewCompleted",
    key: "SecondStageInterviewCompleted",
    render: (completed: boolean, record)=> {
      if(editingRow && editingRow.id === record.id){
         return(
          <Form.Item  name={`SecondStageInterviewCompleted`} valuePropName="checked">
             <Checkbox />
          </Form.Item>
         )
      }else{
        return completed ? "✔️" : "❌";
      }
      },
    filters: booleanFiltersTwo,
    onFilter: (value, record) => record.SecondStageInterviewCompleted?.toString() === value,
    responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
      //? course completed
      {
        title: "Course Completed",
        dataIndex: "CourseCompleted",
        key: "CourseCompleted",
        render: (completed: boolean, record) => {
          if(editingRow && editingRow.id === record.id){
             return(
              <Form.Item  name={`CourseCompleted`}valuePropName="checked">
             <Checkbox />
              </Form.Item>
             )
          }else{
            return completed ? "✔️" : "❌";
          }
          },
        filters: booleanFiltersThree,
        onFilter: (value, record) => record.CourseCompleted?.toString() === value,
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      //? createdAt
      {
        title: "Created At",
        dataIndex: "CreatedAt",
        key: "CreatedAt",
        render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
        sorter: (a: Student, b: Student) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime(),
        responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
      },
      //?active delete
      {
        title: "Delete",
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
      //? update
      {
        title: "Update",
        key: "action",
        render: (_, record) => (
          
             <>
             
             
                <Space direction='horizontal'>
                    <Button type="link" onClick={() => seteditingRow(record)} className="pl-0">
                      Edit
                    </Button>
                    <Button type="link" htmlType="submit" className="text-gray-500">
                      Save
                    </Button>
                  </Space>
             
              
              
              </>
           
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
//? form onfinish
const onFinish = async (values:Student) => {
 
  console.log(values);
  try {
    if (!editingRow) {
      message.error("Editing row is not defined");
    }else{
      const { id, ...rest } = values; // `id`'yi `values`'tan çıkarıyoruz
    const studentData = { id: editingRow.id, ...rest };

    await dispatch(updateStudentAsync(studentData)).unwrap();
    message.success("Student updated successfully");

    }
    
  } catch (error:any) {
    message.error(error.message);
  }
};



  return (
    <div className="mx-6">
      <h1 className="flex justify-center items-center mx-4 text-2xl font-semibold text-cyan-600 p-4 rounded-md">Student Dashboard</h1>
      <Form onFinish={onFinish}>
      {/* <div className="my-4 flex items-center justify-center">
      <Input.Search  placeholder="search..." className="w-1/2 "/>
      </div> */}
      <Table 
        columns={columns} 
        dataSource={Array.isArray(students) ? students : []} 
        loading={isLoading} 
        rowKey="id" 
        scroll={{ x: 'max-content' }}
        rowSelection={rowSelection}
      
   
      />
      </Form>
    </div>
  );
};

export default StudentDashboard;

