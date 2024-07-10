// reference chatgpt

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      restaurant: "Acme Burger",
      date: "2023-06-15",
      items: [
        { name: "Cheeseburger", quantity: 1, price: 8.99 },
        { name: "Fries", quantity: 1, price: 3.99 },
        { name: "Soda", quantity: 1, price: 2.49 },
      ],
      total: 15.47,
    },
    {
      id: 2,
      restaurant: "Sushi Delight",
      date: "2023-05-30",
      items: [
        { name: "California Roll", quantity: 1, price: 12.99 },
        { name: "Miso Soup", quantity: 1, price: 3.99 },
      ],
      total: 16.98,
    },
    {
      id: 3,
      restaurant: "Pizzeria Deluxe",
      date: "2023-04-20",
      items: [
        { name: "Pepperoni Pizza", quantity: 1, price: 16.99 },
        { name: "Garlic Bread", quantity: 1, price: 4.99 },
      ],
      total: 21.98,
    },
  ])
  const [cart, setCart] = useState([])
  const handleReorder = (order) => {
    setCart([...cart, ...order.items])
  }
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Past Orders</h1>
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders"
              className="w-full rounded-full bg-primary-foreground/10 pl-10 pr-4 py-2 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
            />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {orders.map((order) => (
            <Card key={order.id} className="bg-background shadow-md rounded-lg overflow-hidden">
              <CardHeader className="bg-muted p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{order.restaurant}</h2>
                  <div className="text-sm text-muted-foreground">{order.date}</div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-medium">${(item.quantity * item.price).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
                  <Button size="sm" onClick={() => handleReorder(order)}>
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full bg-background shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Cart ({cart.length})</div>
          <div className="text-lg font-bold">${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</div>
          <Button size="lg">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  )
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
  )
}

