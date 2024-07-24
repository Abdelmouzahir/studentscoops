"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
// import restaurantsData from '../restaurantsData.json'
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { GiExitDoor } from "react-icons/gi";
import {
  getRestaurantMenuByStudents,
  getRestaurantDataByOwner,
  getStudentDataByStudents,
  getStudentMenuByStudents,
  getStudentConfirmOrderData,
} from "@/services/GetRequest/getRequest";
import { addMenuToStudent } from "@/services/PostRequest/postRequest";
import { useUserAuth } from "@/services/utils";
import Modal from "@/components/Modal";
import Link from "next/link";

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState(null);
  const [menuDocumentIds, setMenuDocumentIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserAuth();
  const [studentData, setStudentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const restaurantUid = searchParams.get("uid");
  const [restaurantDocumentIds, setRestaurantDocumentIds] = useState([]);
  const [orderData, setOrderData] = useState(null);

  const [restaurant, setRestaurant] = useState(null);

  function fetchRestaurantMenu() {
    getRestaurantMenuByStudents((data) => {
      setFilteredItems(data);
    }, restaurantId);
  }

  function fetchRestaurantData() {
    getRestaurantDataByOwner((data) => {
      setRestaurant(data);
    }, restaurantUid);
  }

  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
    }, user);
  }

  function fetchStudentMenu() {
    getStudentMenuByStudents((data) => {
      setMenuItems(data);
    }, studentData[0].id);
  }

  function fetchOrderData() {
    getStudentConfirmOrderData((data) => {
      setOrderData(data);
    }, studentData[0].id);
  }

  useEffect(() => {
    if (menuItems) {
      console.log("menuitemsvlength: ", menuItems.length);
    }
    if (menuItems && menuItems.length === 0) {
      console.log("length 0 condition ");
      setRestaurantDocumentIds([]);
      setMenuDocumentIds([]);
    } else if (menuItems && menuItems.length === 1) {
      console.log("length 1 condition ");
      const singleItem = menuItems[0];
      setRestaurantDocumentIds([singleItem.restaurantDocId]);
      setMenuDocumentIds([singleItem.menuDocId]);
    } else if (menuItems) {
      console.log("processing menu items: ", menuItems);
      const uniqueRestaurantDocIds = new Set();
      const uniqueMenuDocIds = new Set();

      menuItems.forEach((item) => {
        uniqueRestaurantDocIds.add(item.restaurantDocId);
        uniqueMenuDocIds.add(item.menuDocId);
      });

      setRestaurantDocumentIds([...uniqueRestaurantDocIds]);
      setMenuDocumentIds([...uniqueMenuDocIds]);
    }
  }, [menuItems]);

  useEffect(() => {
    console.log("menuCollectionRef: ", menuDocumentIds);
    console.log("restaurantCollectionRef: ", restaurantDocumentIds);
  }, [menuDocumentIds]);

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchStudentMenu();
      fetchOrderData();
    }
  }, [studentData]);

  useEffect(() => {
    fetchRestaurantMenu();
    fetchRestaurantData();
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBackToMenu = () => {
    router.push("/student");
  };

  const addToCart = async (item) => {
    if (user == false && !studentData) {
      setIsModalOpen(true);
      return;
    }
    if (!item && !restaurant) {
      alert("Please select an item to add to cart");
      return;
    } else {
      const data = {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        status: true,
        addedAt: new Date(),
        orderAt: null,
        restaurantDocId: restaurant[0].id,
        menuDocId: item.id,
        restaurantUid: restaurant[0].uid,
        quantity: item.quantity,
        customerId: null,
        orderId: null,
      };
      console.log("menu length: ", menuDocumentIds.length);
      console.log("restaurant length: ", restaurantDocumentIds.length);
      if (restaurantDocumentIds.length <= 1 && menuDocumentIds.length >= 0) {
        if (menuDocumentIds.includes(item.id)) {
          alert("Item already added to cart");
        }else if(orderData && orderData.length > 0){
          alert("You have an active order. Please pick-up the order to add more items to cart");
          return;
        } else if (
          (restaurantDocumentIds.length === 0 ||
            restaurantDocumentIds.includes(restaurant[0].id)) &&
          (menuDocumentIds.length === 0 || !menuDocumentIds.includes(item.id))
        ) {
          await addMenuToStudent(
            data,
            studentData[0].id,
            restaurant[0].id,
            item.id,
          ).then(() => {
            alert("Item added to cart");
          });
        } else {
          alert("You can only add items from one restaurant at a time");
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start w-full mt-4 mb-3">
        <Button onClick={handleBackToMenu} className="">
          Back <GiExitDoor className="ml-3 h-5 w-5" />
        </Button>
      </div>
      {restaurant && restaurant.length > 0 && restaurant != null ? (
        <section
          className="bg-cover w-full h-[300px] bg-center bg-no-repeat grid sm:grid-cols-2"
          style={{
            backgroundImage: `url(${
              restaurant[0].imageUrl
                ? restaurant[0].imageUrl
                : "/assets/images/UserDefaultSaitStaff.png"
            })`,
          }}
        >
          <div className="bottom-4 left-4 sm:items-end flex sm:m-10 mt-10 justify-center w-full">
            <h1 className="text-4xl font-bold  text-white bg-black/40 p-2 flex items-center">
              {restaurant[0].name}
            </h1>
          </div>
          <div className="bottom-4 right-4 flex items-end justify-start">
            <div className="p-4 flex items-center m-8">
              <Input
                type="search"
                placeholder="Search in the menu"
                className="pl-8 pr-4 py-2 rounded-full bg-white shadow-md w-80 mr-3"
                value={searchTerm}
                onChange={handleSearch}
              />
              {/* <SearchIcon className="ml-3 left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex h-screen w-full text-center justify-center items-center text-3xl animate-pulse">
          Loading..
        </div>
      )}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems && filteredItems.length > 0 && filteredItems != null ? (
          <>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={
                  item.status
                    ? "bg-background  border-2 shadow-xl rounded-md overflow-hidden"
                    : "bg-background  border-2 shadow-xl rounded-md overflow-hidden opacity-40 z-0"
                }
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover bg-cover bg-center m-2"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  <p className="text-muted-foreground text-xl mb-4 font-bold">
                    Quantity: {item.quantity}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">${item.price}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={item.status ? "text-primary cursor-pointer" : "text-primary cursor-default z-0"}
                      onClick={() => {
                        item.status ? addToCart(item) : null;
                      }}
                    >
                      <PlusIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div
                  className={
                    item.status
                      ? "hidden"
                      : "flex justify-start items-end m-3 text-black text-xl font-bold z-20"
                  }
                >
                  <p>Sold</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-screen w-full text-center justify-center items-center text-3xl animate-pulse">
            Loading..
          </div>
        )}
      </section>
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full text-center grid items-center justify-center">
          <p className="font-bold py-3 text-3xl">You are not logged in yet.</p>
          <p className="py-2 text-xl">Please login first to add food to cart</p>
          <div className="grid grid-cols-3 gap-5 py-6 mt-2">
            <Link
              href="/auth/sign-in"
              className="bg-primary p-3 hover:bg-primary/70 cursor-pointer text-black font-bold"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary p-3 hover:bg-primary/70 cursor-pointer text-black font-bold col-start-3"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
