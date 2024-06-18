'use client'
import React, { useState } from 'react';
import { formatPhoneNumber} from "@/Constant/formated"
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '@/app/firebase/config'

const Add = ({ restaurants, setRestaurants, setIsAdding, getRestaurants }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNumber ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newRestaurant = {
      name,
      email,
      mobileNumber,
     
    };

    restaurants.push(newRestaurant);

    try {
      await addDoc(collection(db, "restaurants"), {
        ...newRestaurant
      });
    } catch (error) {
      console.log(error)
    }

    setRestaurants(restaurants);
    setIsAdding(false);
    getRestaurants()

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name}'s data has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
      <form onSubmit={handleAdd} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Add Restaurant</h1>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phone"
            type="text"
            maxLength={14}
            name="phone"
            value={mobileNumber}
            onChange={e => setMobileNumber(formatPhoneNumber(e.target.value))}
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
