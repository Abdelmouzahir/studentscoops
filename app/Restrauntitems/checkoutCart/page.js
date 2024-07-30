"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { deleteFoodFromCart } from "@/services/PostRequest/postRequest";
import {
  getStudentMenuByStudents,
  getRestaurantDataForCheckoutByStudents,
} from "@/services/GetRequest/getRequest";
import Swal from "sweetalert2";
import Link from "next/link"



export default function CheckoutCart({ studentData }) {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState(null); // for the items which are placed in student cart
  const router = useRouter();
  const [userData, setUserData] = useState(null); // for the restaurant data
  const [cartCounter, setCartCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function fetchCartItems() {
    getStudentMenuByStudents((data) => {
      setCartItems(data);
    }, studentData[0].id);
  }

  function fetchRestaurantData() {
    getRestaurantDataForCheckoutByStudents((data) => {
      setUserData(data);
    }, cartItems[0].restaurantUid);
  }

  useEffect(() => {
    if (cartItems && cartItems !== null && cartItems.length > 0) {
      console.log("cartItems", cartItems);
      console.log("studentData", studentData);
      fetchRestaurantData();
      console.log("length", cartItems.length);
      setSubtotal(
        cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0)
      );
    }
    if (cartItems) {
      setCartCount(cartItems.length);
    }
  }, [cartItems]);

  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchCartItems();
    }
  }, [studentData]);

  const handleClick = () => {
    router.push("/student/main/checkout");
    setIsSheetOpen(false);
  };

  const handleCartIsEmpty = () => {
    router.push("/student/main");
    setIsSheetOpen(false);
  };

  async function handleRemoveItem(item) {
    await deleteFoodFromCart(
      studentData[0].id,
      item.id,
      item.restaurantDocId,
      item.menuDocId,
      item.customerId
    ).then(() => {
      Swal.fire("Item removed from cart ❌");
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-white text-black"
            onClick={() => setIsSheetOpen(true)}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCounter > 0 && (
              <span className="ml-2 text-sm font-semibold">{cartCounter}</span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-md bg-white rounded-lg shadow-xl"
        >
          <SheetHeader className="px-6 py-4 border-b">
            {userData && userData != null && userData.length > 0 ? (
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={userData[0].imageUrl} />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="text-lg font-semibold">
                    {userData[0].name}
                  </SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">
                    {userData[0].address}
                  </SheetDescription>
                </div>
              </div>
            ) : (
              <div className="px-6 py-4 space-y-4">
                <p className="text-center text-muted-foreground">
                  Your cart is empty
                </p>
              </div>
            )}
          </SheetHeader>
          {cartItems && cartItems != null && cartItems.length > 0 ? (
            <div className="px-6 py-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {cartItems.map((item) => (<>
                  <div
                  className={
                    item.status
                      ? "hidden"
                      : "flex justify-start items-end m-3 text-black text-xl font-bold z-20"
                  }
                >
                  <p>Sold</p>
                </div>
                <div
                  key={item.id}
                  className={item.status ? "flex items-center justify-between rounded-lg bg-muted p-4" : "flex items-center justify-between rounded-lg bg-muted p-4 opacity-40 z-0"}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-muted-foreground">${item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <TrashIcon className="w-4 h-4  text-primary text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                </div></>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 space-y-4">
              <p className="text-center text-muted-foreground">
                Your cart is empty
              </p>
            </div>
          )}
          <SheetFooter className="px-6 py-4 border-t flex flex-col gap-4 ">
            {cartItems && cartItems != null && cartItems.length > 0 ? (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-lg font-semibold">Subtotal</div>
                    <div className="text-lg font-semibold">${subtotal}</div>
                  </div>
                  <Button
                    onClick={handleClick}
                    className="w-full bg-primary text-white hover:bg-black/90 rounded-md py-2"
                  >
                    Go to Checkout
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="outline" onClick={handleCartIsEmpty} className="w-full rounded-md py-2">
                Add items to cart
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
