"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  getOrderMenuByOwner,
  getRestaurantDataByOwner,
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";

export default function Order() {
  const [orders, setOrders] = useState(null);
  const { user } = useUserAuth();
  const [restaurantData, setRestaurantData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  function fetchRestaurantData() {
    getRestaurantDataByOwner((data) => {
      console.log("Data: ", data);
      setRestaurantData(data);
    }, user);
  }

  function fetchOrders() {
    getOrderMenuByOwner((data) => {
      console.log("menu: ", data);
      setOrders(data);
    }, restaurantData[0].id);
  }

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      fetchRestaurantData();
    }
  }, [user]);
  const filteredOrders = orders
    ? orders.filter((order) => order.id.toString().includes(searchQuery))
    : [];

  useEffect(() => {
    if (
      restaurantData &&
      restaurantData !== null &&
      restaurantData.length > 0
    ) {
      fetchOrders();
    }
  }, [restaurantData]);

  const handleOrderReady = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Waiting for Pickup" }
          : order
      )
    );
    setIsDialogOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
    }, 4000); // Simulate a 2-second loading time
  };
  const handlePickupComplete = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };
  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelConfirmation(true);
  };
  const handleConfirmCancelOrder = () => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderToCancel)
    );
    setShowCancelConfirmation(false);
    setOrderToCancel(null);
  };
  const handleCancelConfirmationClose = () => {
    setShowCancelConfirmation(false);
    setOrderToCancel(null);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Incoming Orders</h1>
      <Input
        type="search"
        placeholder="Search by Order ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      {filteredOrders.length === 0 ? (
        <p className="text-center font-bold">No orders found.</p>
      ) : (
        <ul className="grid gap-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="bg-muted p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="md:w-1/3">
                <h2 className="text-lg font-semibold flex flex-col gap-2">
                  <span className="flex items-center gap-2">
                    <span className="font-bold">Order ID: {order.id}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      ({new Date(order.createdAt).toLocaleString()})
                    </span>
                  </span>
                  <span>{order.customerName}</span>
                </h2>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {order && order !== null && order.length > 0 ? (
                    <>
                      {order.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-background rounded-md px-2 py-1"
                        >
                          <span className="text-sm">
                            {item.quantity}x {item.name}
                          </span>
                        </li>
                      ))}
                    </>
                  ) : (
                    <div className="w-full h-full font-bold text-3xl animate-pulse justify-center flex items-center">
                      <p>Loading...</p>
                    </div>
                  )}
                </ul>
              </div>
              <div className="mt-4 md:mt-0 md:w-1/3 md:text-center">
                <span>
                  {order.status === "Preparing" && (
                    <div className="flex items-center justify-center gap-2">
                      <LoaderPinwheelIcon className="w-4 h-4 animate-spin" />
                      <span>Preparing</span>
                    </div>
                  )}
                  {order.status === "Waiting for Pickup" && (
                    <div className="flex items-center justify-center gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Waiting for Pickup</span>
                    </div>
                  )}
                  {order.status === "On Hold" && (
                    <div className="flex items-center gap-2">
                      <PauseIcon className="w-4 h-4 text-yellow-500" />
                      <span>On Hold</span>
                    </div>
                  )}
                </span>
              </div>
              <div className="mt-4 md:mt-0 md:w-1/3 md:text-right flex justify-end">
                {order.status === "Preparing" ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleOrderReady(order.id)}
                    >
                      Ready
                    </Button>
                    <AlertDialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <AlertDialogTrigger asChild>
                        <div />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {isLoading
                              ? "Notifying Customer..."
                              : "Notification Complete"}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {isLoading ? (
                              <div className="flex items-center">
                                <Spinner className="mr-4" />
                                <p className="ml-2">
                                  Please wait while we notify the customer.
                                </p>
                              </div>
                            ) : (
                              "The customer has been successfully notified."
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        {!isLoading && (
                          <AlertDialogFooter>
                            <AlertDialogAction
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Close
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        )}
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : order.status === "Waiting for Pickup" ? (
                  <Button
                    variant="outline"
                    onClick={() => handlePickupComplete(order.id)}
                  >
                    Pickup Complete
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <AlertDialog
        open={showCancelConfirmation}
        onOpenChange={handleCancelConfirmationClose}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmCancelOrder}
              className="text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LoaderPinwheelIcon(props) {
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
      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
      <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
      <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function PauseIcon(props) {
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
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
