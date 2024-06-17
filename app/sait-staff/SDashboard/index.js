'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/app/firebase/config'

import { studentsData } from '../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "student"));
    const students = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setStudents(students)
  }

  useEffect(() => {
    getStudents();
  }, []);

  const handleEdit = id => {
    const [student] = students.filter(student => student.id === id);

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
    }).then(result => {
      if (result.value) {
        const [student] = students.filter(student => student.id === id);

        //  delete document
        deleteDoc(doc(db, "employees", id))

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${student.firstName} ${student.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const studentsCopy = students.filter(student => student.id !== id);
        setStudents(studentsCopy);
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
          students={students}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setIsEditing={setIsEditing}
          getStudents={getStudents}
        />
      )}
    </div>
  );
};

export default Dashboard;
