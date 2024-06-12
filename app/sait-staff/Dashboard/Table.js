import React from 'react';
import EditButton from '@/components/ui/EditButton';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Employee Management Software</h1>
      <div className="flex justify-between mb-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">Add Employee</button>
        <button className="bg-gray-600 text-white px-6 py-2 rounded shadow hover:bg-gray-700">Logout</button>
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
                      <EditButton
                        onClick={() => handleEdit(employee.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                      >
                        Edit
                      </EditButton>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                      >
                        Delete
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
