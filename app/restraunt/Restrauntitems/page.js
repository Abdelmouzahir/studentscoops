/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9sbb0u4VRKU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function RestaurantItems() {
  const menu = [
    {
      section: "Appetizers",
      items: [
        {
          id: "1",
          name: "Bruschetta",
          description: "Toasted bread topped with tomatoes, garlic, and basil",
          price: 7.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "2",
          name: "Calamari Fritti",
          description: "Crispy fried calamari with lemon and marinara sauce",
          price: 10.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "3",
          name: "Meatballs",
          description: "House-made meatballs in a rich tomato sauce",
          price: 8.99,
          image: "/placeholder.svg?height=150&width=150",
        },
      ],
    },
    {
      section: "Entrees",
      items: [
        {
          id: "4",
          name: "Chicken Parmesan",
          description: "Breaded chicken breast topped with mozzarella and marinara",
          price: 18.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "5",
          name: "Fettuccine Alfredo",
          description: "Fettuccine pasta in a creamy Parmesan sauce",
          price: 16.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "6",
          name: "Grilled Salmon",
          description: "Fresh salmon fillet grilled and served with lemon dill sauce",
          price: 22.99,
          image: "/placeholder.svg?height=150&width=150",
        },
      ],
    },
    {
      section: "Desserts",
      items: [
        {
          id: "7",
          name: "Tiramisu",
          description: "Classic Italian dessert with ladyfingers, mascarpone, and espresso",
          price: 8.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "8",
          name: "Cannoli",
          description: "Crispy fried pastry shells filled with sweetened ricotta",
          price: 6.99,
          image: "/placeholder.svg?height=150&width=150",
        },
        {
          id: "9",
          name: "Gelato",
          description: "Homemade Italian-style ice cream in various flavors",
          price: 5.99,
          image: "/placeholder.svg?height=150&width=150",
        },
      ],
    },
  ]

  const [cart, setCart] = useState([])
  const [recentlyAdded, setRecentlyAdded] = useState(null)


  useEffect(() => {
    if (recentlyAdded) {
      const timeout = setTimeout(() => {
        setRecentlyAdded(null)
      }, 3000) // Adjust the timeout duration as needed (e.g., 3000 milliseconds)
      return () => clearTimeout(timeout)
    }
  }, [recentlyAdded])


  const addToCart = (item) => {
    setCart([...cart, item])
    setRecentlyAdded(item)
  }

  const removeFromCart = (index) => {
    const updatedCart = [...cart]
    updatedCart.splice(index, 1)
    setCart(updatedCart)
  }

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart]
    updatedCart[index].quantity = quantity
    setCart(updatedCart)
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Ristorante Italiano</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-5 h-5 fill-primary" />
                <span className="font-bold">4.8</span>
                <span className="text-gray-500">(1,234 reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-gray-500">1.2 mi</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSignIcon className="w-5 h-5" />
                <span className="text-gray-500">$$</span>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ShoppingCartIcon className="w-5 h-5" />
                      <span className="sr-only">Cart</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={12}>
                    <DropdownMenuLabel>Cart</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {cart.map((item, index) => (
                      <DropdownMenuItem key={index} >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={item.image} width={40} height={40} alt="Product Image" className="rounded-md" />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">x{item.quantity}</div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(index)}>
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="w-4 h-4" />
                           
                          </Button>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Total</div>
                        <div className="text-sm font-medium">${getTotal().toFixed(2)}</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button className="w-full bg-primary">Checkout</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          {menu.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                        <Button variant="outline" onClick={() => addToCart({ ...item, quantity: 1 })}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
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
      <path d="M3 6h18M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}
// Finding similar prop function for the trashicon
    function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
    )
}


    function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
    )
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
    )
}
    function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
    )
}
