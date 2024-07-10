/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5XLH6MHdPYl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Component() {
  const menuItems = [
    {
      name: "Acme Burger",
      description: "A delicious burger with all the fixings.",
      price: 12.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Salad",
      description: "A fresh and healthy salad.",
      price: 9.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Pizza",
      description: "A delicious wood-fired pizza.",
      price: 14.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Pasta",
      description: "A classic pasta dish.",
      price: 11.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Dessert",
      description: "A delectable dessert.",
      price: 6.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Drink",
      description: "A refreshing drink.",
      price: 3.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Appetizer",
      description: "A delicious appetizer.",
      price: 7.99,
      image: "/placeholder.svg",
    },
    {
      name: "Acme Entree",
      description: "A delectable entree.",
      price: 15.99,
      image: "/placeholder.svg",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState(menuItems)
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    setFilteredItems(
      menuItems.filter(
        (item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
      ),
    )
}

  return (
    <div className="flex flex-col">
      
      <section>
      <div className="relative">
        <img src="/placeholder.svg" alt="Restaurant" className="w-full h-[300px] object-cover" />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-2xl font-bold text-white">Crispy Classic Chicken</h1>
        </div>
        <div className="absolute bottom-4 right-4">
          <Input
            type="search"
            placeholder="Search in Crispy Classic Chicken"
            className="pl-8 pr-4 py-2 rounded-full bg-white shadow-md w-80"
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      </section>
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.name} className="bg-background rounded-md overflow-hidden shadow-sm">
            <img
              src="/placeholder.svg"
              alt={item.name}
              width={400}
              height={300}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">${item.price.toFixed(2)}</span>
                <Button size="icon" variant="ghost" className="text-primary">
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
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