'use client'
import React, {useState} from 'react';
import { LuPencil } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { IoStorefront } from "react-icons/io5";
import { formatPhoneNumber } from '@/Constant/formated';
import { FaSearch } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";

const Table = ({ restaurants, handleEdit, handleDelete, setIsAdding, setSearch, search }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg ">
      <h1 className="mb-8 text-4xl font-bold text-center tracking-tight text-orange-800 sm:text-5xl lg:text-4xl">Restaurant Management</h1>
      <div className="flex mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className={
            search
              ? "hidden"
              : "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          <IoStorefront className="mr-2 h-5 w-5" />
          Add Restaurant
        </button>
        <button
          onClick={() => {
            setSearch(!search);
            if (search == true) {
              setEmail("");
              setName("");
              setPhone("");
            }
          }}
          className={
            search
              ? "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              : "ml-10 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          {search ? <><MdOutlineDoneOutline className="mr-2 h-4 w-4"/>Done</> : <><FaSearch className="mr-2 h-4 w-4" />Search</>}
        </button>
        
      </div>
      <div className={
          search
            ? "w-full grid grid-cols-3 gap-5 bg-white rounded mb-5 p-3"
            : "hidden"
        }>
        <div>
          <label>First Name</label>
          <input
            className="rounded ml-2 p-1 border-black border-2"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="rounded ml-2 p-1 border-black border-2"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            className="rounded ml-2 p-1 border-black border-2"
            value={formatPhoneNumber(phone)}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              
              <th className="py-4 px-6">Restaurant Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone Number</th>
              
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {restaurants && restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <tr key={restaurant.id} className="hover:bg-gray-100">
                  {(email || phone || name).length > 0 ? (
                    <>
                      {((restaurant.email.toLowerCase().includes(email) &&
                        phone == "" &&
                        name == "") ||
                        (restaurant.email.toLowerCase().includes(email) &&
                          restaurant.phoneNumber.toLowerCase().includes(phone) &&
                          name == "") ||
                        (restaurant.email.toLowerCase().includes(email) &&
                          phone == "" &&
                          restaurant.name.toLowerCase().includes(name)) ||
                        (restaurant.phoneNumber.toLowerCase().includes(phone) &&
                          email == "" &&
                          restaurant.name.toLowerCase().includes(name)) ||
                        (restaurant.phoneNumber.toLowerCase().includes(phone) &&
                          email == "" &&
                          name == "") ||
                        (restaurant.name.toLowerCase().includes(name) &&
                          email == "" &&
                          phone == "") ||
                        (restaurant.email.toLowerCase().includes(email) &&
                          restaurant.phoneNumber.toLowerCase().includes(phone) &&
                          restaurant.name.toLowerCase().includes(name))) && (
                        <>
                          <td className="py-4 px-6 text-center">
                            {restaurant.name[0].toUpperCase() +
                              restaurant.name.slice(1)}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {restaurant.email}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {formatPhoneNumber(restaurant.phoneNumber)}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => {
                                  handleEdit(restaurant.id);
                                }}
                                className="inline-flex items-center justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                              >
                                Edit
                                <LuPencil className="ml-2 h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(restaurant.id);
                                }}
                                className="inline-flex items-center justify-center rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-red-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                              >
                                Delete
                                <LuTrash className="ml-2 h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-6 text-center">
                        {restaurant.name[0].toUpperCase() + restaurant.name.slice(1)}
                      </td>
                      <td className="py-4 px-6 text-center">{restaurant.email}</td>
                      <td className="py-4 px-6 text-center">
                        {formatPhoneNumber(restaurant.phoneNumber)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(restaurant.id)}
                            className="inline-flex items-center justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                          >
                            Edit
                            <LuPencil className="ml-2 h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(restaurant.id)}
                            className="inline-flex items-center justify-center rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-red-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                          >
                            Delete
                            <LuTrash className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-6 text-center text-gray-500">
                  No restaurants
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
