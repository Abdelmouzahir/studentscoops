"use client";
import React, { useState } from "react";
import { formatPhoneNumber } from "@/Constant/formated";
import Swal from "sweetalert2";

import { auth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addRestaurant } from "@/services/RealTimeDatabase/postData/postData";

const Add = ({ restaurants, setRestaurants, setIsAdding, getRestaurants }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth(); // Remember, month is zero-indexed
  const year = currentDate.getFullYear();

  const newDate = [day, month, year];
  let firstWord = name.split(" ");

  //generic password will be first name of student or restaurant + last three digits of mobile number + "!"
  // like student name :- Moiz Khan mobilenumber :- 1234567890, so the password will be Moiz890!
  // by this the password will bw different for every one and they can change it on forget password
  const genericPassword = firstWord[0] + phoneNumber.slice(-3).concat("!");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !address) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    try {
      console.log("geneic password: ", genericPassword);
      // Create user in Firebase Authentication
      await createUserWithEmailAndPassword(
        auth,
        email,
        genericPassword
      ).then((userCredential) => {return userCredential.user}).then(async(user)=>{
        const newRestaurant = {
        name,
        email,
        phoneNumber,
        address,
        uid:user.uid
      };
      await addRestaurant({ restaurant: newRestaurant });
      })

      // Add restaurant to Firestore
      

      //await addRestaurant({ restaurant: newRestaurant });

      // Update local state
      restaurants.push(newRestaurant);
      setRestaurants(restaurants);
      setIsAdding(false);
      getRestaurants();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${name}'s data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
      <form onSubmit={handleAdd} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Add Restaurant
        </h1>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Restaurant Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            maxLength={14}
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
