'use client'
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { deleteRestaurantData } from '@/services/PostRequest/postRequest';


import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '@/app/firebase/config'

//import { studentsData } from '../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [restaurants, setRestaurants] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    const restaurants = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setRestaurants(restaurants)
  }
  console.log(restaurants);

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleEdit = id => {
    const [restaurant] = restaurants.filter(restaurant => restaurant.id === id);

    setSelectedRestaurant(restaurant);
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
    }).then(async(result) => {
      if (result.value) {
        const [restaurant] = restaurants.filter(restaurant => restaurant.id === id);

        // delete document
        await deleteRestaurantData(id)

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${restaurant.name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const restaurantsCopy = restaurants.filter(restaurant => restaurant.id !== id);
        setRestaurants(restaurantsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          
          <Table
            restaurants={restaurants}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsAdding={setIsAdding}
          />
        </>
      )}
      {isAdding && (
        <Add
          restaurants={restaurants}
          setRestaurants={setRestaurants}
          setIsAdding={setIsAdding}
          getRestaurants={getRestaurants}
        />
      )}
      {isEditing && (
        <Edit
          restaurants={restaurants}
          selectedRestaurant={selectedRestaurant}
          setRestaurants={setRestaurants}
          setIsEditing={setIsEditing}
          getRestaurants={getRestaurants}
        />
      )}
    </div>
  );
};

export default Dashboard;
