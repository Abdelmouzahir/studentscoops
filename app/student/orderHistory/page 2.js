"use client" // Indicates that this component uses client-side features like hooks or context

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Component() {
  // Access the Next.js router to programmatically navigate
  const router = useRouter();

  // Sample data representing past orders
  const orders = [
    {
      id: 1,
      restaurant: "Cal City Pizza",
      items: [
        { name: "Pop Can (355 Ml)", description: "Coke", quantity: 1 },
        { name: "Loaded Veggie Special Pizza", description: "Medium", quantity: 1 },
      ],
      total: 25.85,
      date: new Date("2023-04-16T20:19:00"),
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      restaurant: "Karahi Boys",
      items: [
        { name: "Moti Mehal Paneer Karahi", quantity: 1 },
        { name: "Garlic Naan", description: "Buttered", quantity: 2 },
      ],
      total: 28.12,
      date: new Date("2023-04-15T20:44:00"),
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      restaurant: "Punjabi Sweet House & Restaurant",
      items: [
        { name: "Item 1", quantity: 1 },
        { name: "Item 2", quantity: 1 },
      ],
      total: 22.19,
      date: new Date("2023-04-15T13:55:00"),
      image: "/placeholder.svg?height=150&width=150",
    },
  ];

  // Function to handle the click event on the Reorder button
  const handleClick = (orderId) => {
    // Navigate to the checkout page with the orderId as a query parameter
    router.push(`/student/checkout?orderId=${orderId}`);
  };

  return (
    <div className="space-y-8 p-4">
      {/* Main heading for the past orders page */}
      <h1 className="text-5xl font-bold mb-4">Past Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col space-y-4 border-b pb-4">
          <div className="flex">
            {/* Order image */}
            <img src="/placeholder.svg" alt={order.restaurant} className="w-48 h-48 object-cover" />
            <div className="flex flex-col justify-between ml-4">
              <div>
                {/* Restaurant name and order details */}
                <h3 className="text-4xl font-bold">{order.restaurant}</h3>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} items for ${order.total.toFixed(2)} · {order.date.toLocaleString()}
                </p>
              </div>
              <div className="mt-2">
                {/* List of items in the order */}
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-4">
                    <span className="bg-black rounded-md px-2 py-1 text-sm text-white">{item.quantity}</span>
                    <span className="text-lg">{item.name}</span>
                    {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-auto flex flex-col space-y-2 items-center justify-center">
              {/* Button to reorder the items */}
              <Button onClick={() => handleClick(order.id)} className="bg-black text-white py-3 px-6 w-full">Reorder</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
