'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/app/firebase/config';

const Dashboard = ({ setIsAuthenticated }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

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
          await deleteDoc(doc(db, "students", id));
          setStudents(students.filter(student => student.id !== id));
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
          />
        </>
      )}
      {isAdding && (
        <Add
          students={students}
          setStudents={setStudents}
          setIsAdding={setIsAdding}
          getStudents={getStudents}
        />
      )}
      {isEditing && (
        <Edit
          selectedStudent={selectedStudent}
          setIsEditing={setIsEditing}
          getStudents={getStudents}
        />
      )}
    </div>
  );
};

export default Dashboard;
