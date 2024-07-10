import React, { useState } from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";
import Modal from "@/components/Modal";
import { FaFilter } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";
import DateComponent from "@/components/Date";

const Table = ({
  admin,
  handleEdit,
  setIsAdding,
  handleChangeStatus,
}) => {
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [isVisible, setIsVisisble] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [email, setEmail] = useState("");
  const [docId, setDocId] = useState("");
  const filteredEmployees = 
    admin && admin.length > 0
      ? admin.filter(user => {
          if (searchBy === "name") {
            return user.name.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (searchBy === "email") {
            return user.email.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (searchBy === "phone") {
            return user.phoneNumber.includes(searchTerm);
          }
          return true;
        })
      : [];


  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className={
              search
                ? "hidden"
                : "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
            }
          >
            <IoMdPersonAdd className="mr-2 h-4 w-4" />
            Add Admin
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label>Criteria</label>
          <select
            className="w-full rounded ml-2 p-1 border-black border-2"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-fixed">
            <thead className="text-center">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs  font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs  font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (filteredEmployees.map((user) => (
                <tr key={user.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.email}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {user.role}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {/* this how the date should be mentionned correctly please look at Date.js for more details*/ }
                    <DateComponent dateObject={user.accountCreated} />
                    {/*console.log("date: ",user.accountCreated)*/}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    onClick={() => {
                      setIsVisisble(true);
                      setIsActive(user.active),
                        setEmail(user.email),
                        setDocId(user.id);
                    }}
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded ${
                      user.active ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    <span
                      aria-hidden
                      // className={` inset-0 ${user.active && 'bg-green-400'} opacity-50 rounded-full`}
                    ></span>
                    <span className="p-3 cursor-pointer">
                      {user.active ? "Active" : "InActive"}
                    </span>
                  </span>
                </td>
                <td className="px-5 py-5 text-center border-gray-200 bg-white text-sm  border-b">
                  <button
                    onClick={() => handleEdit(user)}
                    className="inline-flex items-center mr-2 justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                  >
                    Edit
                    <LuPencil className="ml-2 h-4 w-4" />
                  </button>
                </td>
              </tr>
              ))):(<><tr>
                  <td
                    colSpan="5"
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    No data available
                  </td>
                </tr></>)}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isVisible={isVisible} onClose={() => setIsVisisble(false)}>
        <div>
          <h1 className="text-2xl font-extrabold mx-2">
            {isActive ? "Deactivate User" : "Activate User"}
          </h1>
          <span className="text-xl">
            <p className="p-2">
              Are you sure you want to {isActive ? "deactivate" : "activate"}{" "}
              email <p className="inline font-bold">{email}?</p> This will make
              it{" "}
              <p className="inline font-bold">
                {isActive ? "unavailable" : "available"}
              </p>
              <p className="inline"> to users.</p>
            </p>
          </span>
          <div className="flex justify-end mt-4">
            <button
            onClick={()=>{handleChangeStatus(docId, isActive);setIsVisisble(false)}}
              className={`cursor-pointer bg-danger p-2 rounded-xl font-bold text-md mr-3 ${
                !isActive
                  ? "bg-green-400 hover:bg-green-200"
                  : "bg-red-400 hover:bg-red-200"
              }`}
            >
              {isActive ? "inActive" : "Active"}
            </button>
            <button onClick={()=>setIsVisisble(false)} className="cursor-pointer bg-orange-400 hover:bg-orange-200 p-2 rounded-xl font-bold text-md ml-3">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
