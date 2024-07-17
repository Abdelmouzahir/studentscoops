"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

const Dashboard = ({ studentData }) => {
  const [students, setStudents] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    if (studentData) {
      setStudents(studentData);
    }
  }, [studentData]);

  const handleEdit = (id) => {
    const student = students.find((student) => student.id === id);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {

  };

  return (
    <div className="container">
      {students || students != null ? (
        <>
          {students && students.length > 0 ? (
            <>
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
                  setStudents={setStudents}
                  setIsAdding={setIsAdding}
                />
              )}
              {isEditing && (
                <Edit
                  selectedStudent={selectedStudent}
                  setIsEditing={setIsEditing}
                />
              )}
            </>
          ) : (
            <div className="w-full text-center grid items-center justify-center h-screen">
              <p className="text-3xl font-bold animate-pulse">Loading...</p>
            </div>
          )}
        </>
      ) : (
        <div className="w-full text-center grid items-center justify-center h-screen">
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
