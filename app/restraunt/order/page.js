"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertDialog , AlertDialogContent , AlertDialogHeader , AlertDialogTitle , AlertDialogDescription , AlertDialogFooter , AlertDialogCancel ,AlertDialogAction } from "@/components/ui/alert-dialog"

export default function Order() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "John Doe",
      orderDetails: [
        { name: "Margherita Pizza", quantity: 1 },
        { name: "Caesar Salad", quantity: 1 },
        { name: "Garlic Bread", quantity: 2 },
      ],
      status: "Preparing",
      createdAt: new Date("2023-06-15T10:30:00Z"),
    },
    {
      id: 2,
      customerName: "Jane Smith",
      orderDetails: [
        { name: "Spaghetti Bolognese", quantity: 1 },
        { name: "Tiramisu", quantity: 1 },
      ],
      status: "Preparing",
      createdAt: new Date("2023-06-15T11:15:00Z"),
    },
    {
      id: 3,
      customerName: "Bob Johnson",
      orderDetails: [
        { name: "Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
        { name: "Chocolate Milkshake", quantity: 1 },
      ],
      status: "Preparing",
      createdAt: new Date("2023-06-15T12:00:00Z"),
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState(null)
  
  const handleOrderReady = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: "Waiting for Pickup" } : order)),
    )
  }
  
  const handlePickupComplete = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
  }
  
  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId)
    setShowCancelConfirmation(true)
  }
  
  const handleConfirmCancelOrder = () => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderToCancel))
    setShowCancelConfirmation(false)
    setOrderToCancel(null)
  }
  
  const handleCancelConfirmationClose = () => {
    setShowCancelConfirmation(false)
    setOrderToCancel(null)
  }
  
  const filteredOrders = orders.filter((order) => order.id.toString().includes(searchQuery))
  
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
        <p>No orders found.</p>
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
                  {order.orderDetails.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-background rounded-md px-2 py-1">
                      <span className="text-sm">
                        {item.quantity}x {item.name}
                      </span>
                    </li>
                  ))}
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
              <div className="mt-4 md:mt-0 md:w-1/3 md:text-right">
                {order.status === "Preparing" ? (
                  <div className="flex gap-2 md:ml-auto justify-end">
                    <Button variant="outline" onClick={() => handleOrderReady(order.id)}>
                      Ready
                    </Button>
                    <Button variant="destructive" onClick={() => handleCancelOrder(order.id)}>
                      Cancel
                    </Button>
                  </div>
                ) : order.status === "Waiting for Pickup" ? (
                  <Button variant="outline" onClick={() => handlePickupComplete(order.id)}>
                    Pickup Complete
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <AlertDialog open={showCancelConfirmation} onOpenChange={handleCancelConfirmationClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleConfirmCancelOrder} className="text-white">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
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
  )
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
  )
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
  )
}
