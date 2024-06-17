import React from 'react';
import { LuPencil } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";

const Table = ({ students, handleEdit, handleDelete, setIsAdding }) => {

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg ">
      <h1 className="mb-8 text-4xl font-bold text-center tracking-tight text-orange-800 sm:text-5xl lg:text-4xl">Restaurant Management</h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
        >
          <PiStudentBold className="mr-2 h-4 w-4" />
          Add Restaurant
        </button>
        
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              
              <th className="py-4 px-6">First Name</th>
              <th className="py-4 px-6">Last Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone Number</th>
              
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students && students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  
                  <td className="py-4 px-6 text-center">{student.firstName}</td>
                  <td className="py-4 px-6 text-center">{student.lastName}</td>
                  <td className="py-4 px-6 text-center">{student.email}</td>
                  <td className="py-4 px-6 text-center">{formatPhoneNumber(student.phone)}</td>
                 
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(student.id)}
                        className="inline-flex items-center justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                      >
                        Edit
                        <LuPencil className="ml-2 h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="inline-flex items-center justify-center rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-red-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                      >
                        Delete
                        <LuTrash className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-center text-gray-500">No students</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
