/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8qq9NhUyhgv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showOrderHistory, setShowOrderHistory] = useState(null)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const filterCustomers = (customers) => {
    return customers.filter((customer) => {
      const searchValue = searchTerm.toLowerCase()
      const customerValue = customer.name.toLowerCase()
      return customerValue.includes(searchValue)
    })
  }
  const customers = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      lastVisit: "2023-05-15",
      orders: [
        { id: 1, date: "2023-05-10", total: 25.99 },
        { id: 2, date: "2023-04-20", total: 18.75 },
        { id: 3, date: "2023-03-15", total: 32.5 },
      ],
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      lastVisit: "2023-04-30",
      orders: [
        { id: 4, date: "2023-04-25", total: 41.25 },
        { id: 5, date: "2023-03-10", total: 27.99 },
      ],
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      lastVisit: "2023-03-20",
      orders: [
        { id: 6, date: "2023-03-18", total: 16.5 },
        { id: 7, date: "2023-02-28", total: 22.75 },
        { id: 8, date: "2023-01-15", total: 29.99 },
      ],
    },
    {
      name: "Alice Williams",
      email: "alice@example.com",
      phone: "555-3456",
      lastVisit: "2023-02-10",
      orders: [{ id: 9, date: "2023-02-05", total: 37.25 }],
    },
    { name: "Tom Davis", email: "tom@example.com", phone: "555-7890", lastVisit: "2023-01-05", orders: [] },
  ]
  const filteredCustomers = filterCustomers(customers)
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card className="col-span-1 md:col-span-2 bg-white shadow rounded-lg">
          <CardHeader className="bg-yellow-500 p-4 rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-white">Customer History</CardTitle>
            <CardDescription className="text-white">
              View the history of customers who have visited the restaurant.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between mb-4">
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full max-w-xs rounded bg-gray-100 border border-gray-300 text-gray-700"
              />
            </div>
            <Table className="w-full">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="py-2 text-gray-700">#</TableHead>
                  <TableHead className="py-2 text-gray-700">Name</TableHead>
                  <TableHead className="py-2 text-gray-700">Email</TableHead>
                  <TableHead className="py-2 text-gray-700">Phone</TableHead>
                  <TableHead className="py-2 text-gray-700">Last Visit</TableHead>
                  <TableHead className="py-2 text-gray-700">Order History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow key={index} className="odd:bg-white even:bg-gray-50">
                    <TableCell className="py-2 text-gray-700">{index + 1}</TableCell>
                    <TableCell className="py-2 text-gray-700">{customer.name}</TableCell>
                    <TableCell className="py-2 text-gray-700">{customer.email}</TableCell>
                    <TableCell className="py-2 text-gray-700">{customer.phone}</TableCell>
                    <TableCell className="py-2 text-gray-700">{customer.lastVisit}</TableCell>
                    <TableCell className="py-2">
                      <Button
                        onClick={() => setShowOrderHistory(customer)}
                        variant="outline"
                        size="sm"
                        className="border border-yellow-500 text-yellow-500 rounded"
                      >
                        View Orders
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {showOrderHistory && (
          <Dialog
            open
            onOpenChange={() => setShowOrderHistory(null)}
            className="bg-gray-50 rounded-lg shadow-lg"
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="p-4 bg-yellow-500 rounded-t-lg">
                <DialogTitle className="text-xl font-semibold text-white">Order History for {showOrderHistory.name}</DialogTitle>
                <DialogDescription className="text-white">
                  Here are the orders placed by {showOrderHistory.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-4">
                {showOrderHistory.orders.length === 0 ? (
                  <p className="text-gray-700">No orders found for this customer.</p>
                ) : (
                  <Table className="w-full">
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="py-2 text-gray-700">Order ID</TableHead>
                        <TableHead className="py-2 text-gray-700">Date</TableHead>
                        <TableHead className="py-2 text-gray-700">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {showOrderHistory.orders.map((order) => (
                        <TableRow key={order.id} className="odd:bg-white even:bg-gray-50">
                          <TableCell className="py-2 text-gray-700">#{order.id}</TableCell>
                          <TableCell className="py-2 text-gray-700">{order.date}</TableCell>
                          <TableCell className="py-2 text-gray-700">${order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <DialogFooter className="p-4 bg-gray-100 rounded-b-lg">
                <Button
                  onClick={() => setShowOrderHistory(null)}
                  className="bg-yellow-500 text-white rounded"
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}
