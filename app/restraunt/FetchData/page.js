"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  getRestaurantInformation,
  getMenuInformation,
} from "@/services/GetRequest/getRequest";
import Image from "next/image";

function page() {
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const fetchMenu = async (restaurants) => {
    for (const restaurant of restaurants) {
      await getMenu(restaurant.id);
      console.log("restaurant id: ", restaurant.id);
    }
  };

  const getMenu = async (id) => {
    const data = await getMenuInformation(id);
    setMenuData((prevData) => [...prevData, ...data]); // Assuming data is an array
    console.log("menu data: ", data);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurantInformation();
      setRestaurantData(data);
      console.log("restaurant data", data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (restaurantData.length > 0) {
      fetchMenu(restaurantData);
    }
  }, [restaurantData]);
  console.log("restaurant data: ", restaurantData);
  console.log("menu data: ", menuData);
  return (
    <div
      className="min-h-screen py-40 items-center w-full h-screen grid justify-center text-center"
      style={{ backgroundImage: "linear-gradient(115deg, #dfc42f, #faf7df)" }}
    >
      <div className="grid bg-white text-black p-4 shadow-xl items-center justify-center text-center w-3/4 mx-auto">
        <p className="text-3xl font-bold col-span-full">Fetching Data</p>
        {restaurantData.length > 0 ? (
          <div>
            {restaurantData.map((item) => {
              return (
                <div key={item.id} className="bg-slate-300 p-3 mb-4">
                  <Image
                    src={item.imageUrl}
                    height={500}
                    width={500}
                    layout="responsive"
                  />
                  <p className="text-black">{item.name}</p>
                  <div>
                    <p>Menu is shown below</p>
                    {menuData.length > 0 ? (
                      <div>
                        {menuData.map((menu) => {
                          return (
                            <div key={menu.id}>
                              {menu.userId === item.userId && (
                                <div>
                                  <Image
                                    src={menu.imageUrl}
                                    height={500}
                                    width={500}
                                    layout="responsive"
                                  />
                                  <p className="text-black">{menu.name}</p>
                                  <p className="text-black font-bold">
                                    {menu.price}
                                  </p>
                                  <p>{menu.description}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p>Fetching Menu....</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>FetchData...</p>
        )}
      </div>
    </div>
  );
}

export default page;
