"use client";
import { useState } from "react";
import React from "react";
import { LuPencil } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

const Table = ({
  students,
  handleEdit,
  handleDelete,
  setIsAdding,
  setSearch,
  search,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString;
  }

  const filteredStudents =
    students && students.length > 0
      ? students.filter((student) => {
          const term = searchTerm.toLowerCase();
          if (searchCriteria === "name") {
            return student.name.toLowerCase().includes(term);
          } else if (searchCriteria === "email") {
            return student.email.toLowerCase().includes(term);
          } else if (searchCriteria === "phone") {
            return student.phoneNumber.includes(term);
          }
          return false;
        })
      : [];

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg ">
      <h1 className="mb-8 text-4xl font-bold text-center tracking-tight text-orange-800 sm:text-5xl lg:text-4xl">
        Student Management
      </h1>
      <div className="flex mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className={
            search
              ? "hidden"
              : "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          <PiStudentBold className="mr-2 h-4 w-4" />
          Add Student
        </button>

        <button
          onClick={() => {
            setSearch(!search);
            if (search) {
              setSearchTerm("");
            }
          }}
          className={
            search
              ? "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              : "ml-10 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          {search ? (
            <>
              <MdOutlineDoneOutline className="mr-2 h-4 w-4" />
              Done
            </>
          ) : (
            <>
              <FaFilter className="mr-2 h-4 w-4" />
              Filter by
            </>
          )}
        </button>
      </div>
      <div
        className={
          search
            ? "w-full grid grid-cols-3 gap-5 bg-white rounded mb-5 p-3"
            : "hidden"
        }
      >
        <div>
          <label>Search</label>
          <input
            className="rounded ml-2 p-1 border-black border-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <label>Criteria</label>
          <select
            className="rounded ml-2 p-1 border-black border-2 w-full"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-4 px-6">First Name</th>
              <th className="py-4 px-6">Last Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone Number</th>
              <th className="py-4 px-6">createdAt</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">
                    {student.name[0].toUpperCase() + student.name.slice(1)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {student.lastName[0].toUpperCase() +
                      student.lastName.slice(1)}
                  </td>
                  <td className="py-4 px-6 text-center">{student.email}</td>
                  <td className="py-4 px-6 text-center">
                    {formatPhoneNumber(student.phoneNumber)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <p
                      className={
                        student.accountCreated
                          ? "text-gray-900 whitespace-no-wrap"
                          : "text-gray-900 whitespace-no-wrap animate-pulse"
                      }
                    >
                      {student.accountCreated
                        ? student.accountCreated.toDate().toDateString()
                        : "Loading..."}
                    </p>
                  </td>
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
                <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
