'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { getAllStudentsInformation } from '@/services/GetRequest/getRequest';
import { deleteStudentData } from '@/services/PostRequest/postRequest';

const Dashboard = ({ setIsAuthenticated }) => {
  const [students, setStudents] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  
  async function getStudents() {
      const data = await getAllStudentsInformation();
      setStudents(data);
    }

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    if (isEditing === false) {
      async function fetchUpdatedStudents() {
        const data = await getAllStudentsInformation();
        setStudents(data);
      }
      fetchUpdatedStudents();
    }
  }, [isEditing]);

  const handleEdit = id => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudentData(id);
          const updatedStudents = students.filter(student => student.id !== id);
          setStudents(updatedStudents);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Student data has been deleted.',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting student: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while deleting the student.',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Table
            students={students}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsAdding={setIsAdding}
            search={search}
            setSearch={setSearch}
          />
        </>
      )}
      {isAdding && (
        <Add
          students={students}
          setStudents={setStudents}
          setIsAdding={setIsAdding}
          getStudents={getAllStudentsInformation}
        />
      )}
      {isEditing && (
        <Edit
          selectedStudent={selectedStudent}
          setIsEditing={setIsEditing}
          getStudents={getAllStudentsInformation}
        />
      )}
    </div>
  );
};

export default Dashboard;
