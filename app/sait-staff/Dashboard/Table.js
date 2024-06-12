import React from 'react';
import { LuPencil } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";

const Table = ({ employees, handleEdit, handleDelete, setIsAdding }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Student Management</h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-blue-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
        >
          <PiStudentBold className="mr-2 h-4 w-4" />
          Add Employee
        </button>
        
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-4 px-6">No.</th>
              <th className="py-4 px-6">First Name</th>
              <th className="py-4 px-6">Last Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Salary</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees && employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="py-4 px-6 text-center">{employee.firstName}</td>
                  <td className="py-4 px-6 text-center">{employee.lastName}</td>
                  <td className="py-4 px-6 text-center">{employee.email}</td>
                  <td className="py-4 px-6 text-center">{formatter.format(employee.salary)}</td>
                  <td className="py-4 px-6 text-center">{employee.date}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="inline-flex items-center justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                      >
                        Edit
                        <LuPencil className="ml-2 h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
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
                <td colSpan={7} className="py-4 px-6 text-center text-gray-500">No Employees</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
